import React, { useEffect, useRef, useState } from "react";
import { getWords, addWord, deleteWord, updateWord } from "../services/apiServices";
import { SEARCH_DEBOUNCE_TIME, WORDS_PAGE_SIZE } from "../constants";
import WordCard from "./WordCard";
import styles from "../Styles/Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton, TextField } from "@mui/material";
import AddWordDialog from "./AddWordDialog";

const Homepage = () => {
  const [currPage, setcurrPage] = useState(0);
  const [words, setWords] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [isAddWordOpen, setIsAddWordOpen] = useState(false);
  const [wordUpdateInd, setWordUpdateInd] = useState(-1);
  const [updateWordData, setUpdateWordData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimerRef = useRef(null);
  const isFirstTimeLoad = useRef(true);
  useEffect(() => {
    if (!currPage) {
      fetchWords(true);
    }
  }, [currPage]);

  const fetchWords = (loader = false) => {
    loader && setIsLoading(true);
    getWords(currPage + 1, WORDS_PAGE_SIZE, loader, searchText).then((res) => {
      res = res.data;
      const newWords = res.data || [];
      const paginationInfo = res?.paginationInfo;
      setWords([...words, ...newWords]);
      setcurrPage(paginationInfo.pageNo);
      setTotalRecords(paginationInfo.totalRecords);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
    });
  };

  const onAddWordClick = (wordData) => {
    if(wordUpdateInd !== -1) {
      const payload = {
        wordId: words?.[wordUpdateInd],
        userMeanings: wordData?.meanings,
      };
      updateWord(payload).then(res => {
        const newWords = [...words]
        newWords[wordUpdateInd] = res?.data?.data;
        setWords(newWords);
        handleWordModalClose();
      })
      return;
    }
    addWord(wordData).then((res) => {
      setcurrPage(0);
      setWords([]);
      setIsLoading(true);
      handleWordModalClose();
    });
  };

  const handleWordModalClose = () => {
    setIsAddWordOpen(false);
    setWordUpdateInd(-1);
    setUpdateWordData(null);
  }

  const handleDeleteWord = (index) => {
    const payload = {
      wordId: words?.[index]?._id
    };
    deleteWord(payload).then((res) => {
      const updatedWords = [...words];
      updatedWords.splice(index,1);
      setWords(updatedWords);
      setTotalRecords(totalRecords -1);
    });
  }

  const onUpdateWord = (index) => {
    const word = words?.[index];
    const wordData = {
      name: word?.name,
      meanings: word?.userMeanings,
    }
    setWordUpdateInd(index);
    setUpdateWordData(JSON.parse(JSON.stringify(wordData)));
    setIsAddWordOpen(true);
  }

  const onSearchInputChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    if(isFirstTimeLoad.current) {
      isFirstTimeLoad.current = false;
      return;
    }
    debounce(() => () => {}, SEARCH_DEBOUNCE_TIME);
  }, [searchText]);

  const debounce = (callback, delay)  => {
    if(debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setWords([]);
      setcurrPage(0);
      debounceTimerRef.current = null;
    }, delay);
  }

  return (
    <>
      {totalRecords && <div className={styles.totalWordInfo}>{totalRecords} Words added so far!!</div>}
      {totalRecords && <div className={styles.searchBar}>
        <div className={styles.wrapper}>
          <TextField
            label='Search a Word'
            placeholder={`Search among ${totalRecords} words`}
            variant="standard"
            value={searchText}
            fullWidth
            onChange={onSearchInputChange}
            InputProps={{
              sx: {
                '&:before': {
                  borderBottom: '2px solid #000',
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottom: '2px solid #000',
                },
                '&:after': {
                  borderBottom: '2px solid #3f51b5',
                },
              },
            }}
          />
        </div>
      </div>
      }
      <div className={styles.scrollContainer} id="infiniteScrollCont">
        {!isLoading &&
          (words.length ? (
            <InfiniteScroll
              dataLength={words.length}
              next={fetchWords}
              hasMore={currPage * WORDS_PAGE_SIZE < totalRecords}
              loader={
                <Stack spacing={2} paddingTop={"20px"}>
                  <Skeleton variant="rectangular" height={30} />
                  <Skeleton variant="rectangular" height={30} />
                  <Skeleton variant="rectangular" height={30} />
                  <Skeleton variant="rectangular" height={30} />
                  <Skeleton variant="rectangular" height={30} />
                </Stack>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              style={{
                padding: "10px",
              }}
              scrollableTarget="infiniteScrollCont"
              scrollThreshold={"200px"}
            >
              <div className={styles.cardContainer}>
                {words.map((word, index) => (
                  <WordCard key={word._id} data={word} index={index} onDeleteWord={handleDeleteWord} onUpdateWord={onUpdateWord}/>
                ))}
              </div>
            </InfiniteScroll>
          ) : (searchText.length ? <div style={{textAlign: 'center'}}>No matching words Found</div> :
            <div className={styles.emptyContainer}>
              <div>
                <h1>Nothing Found !</h1>
                <p>Add some words By Clicking + icon</p>
              </div>
            </div>
          ))
        }
        <IconButton
          className={styles.AddWordIcon}
          onClick={() => setIsAddWordOpen(true)}
          aria-label="Add Word"
          size="large"
          color="primary"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
        <AddWordDialog isOpen={isAddWordOpen}  handleClose={handleWordModalClose} onAddWordClick={onAddWordClick} updateWordData={updateWordData}/>
      </div>
    </>
  );
};

export default Homepage;
