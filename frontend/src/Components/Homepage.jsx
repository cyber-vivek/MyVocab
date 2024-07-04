import React, { useEffect, useState } from "react";
import { getWords, addWord } from "../services/apiServices";
import { WORDS_PAGE_SIZE } from "../constants";
import WordCard from "./WordCard";
import styles from "../Styles/Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";
import AddWordDialog from "./AddWordDialog";

const Homepage = () => {
  const [currPage, setcurrPage] = useState(0);
  const [words, setWords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isAddWordOpen, setIsAddWordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!currPage) {
      fetchWords(true);
    }
  }, [currPage]);

  const fetchWords = (loader = false) => {
    loader && setIsLoading(true);
    getWords(currPage + 1, WORDS_PAGE_SIZE, loader).then((res) => {
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
    addWord(wordData).then((res) => {
      setcurrPage(0);
    });
  };

  return (
    <>
      <div className={styles.scrollContainer} id="infiniteScrollCont">
        {!isLoading &&
          (words.length ? (
            <InfiniteScroll
              dataLength={words.length}
              next={fetchWords}
              hasMore={currPage * WORDS_PAGE_SIZE < totalRecords}
              loader={
                <Stack spacing={1} paddingTop={"20px"}>
                  <Skeleton variant="rectangular" height={60} />
                  <Skeleton variant="rectangular" height={60} />
                  <Skeleton variant="rectangular" height={60} />
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
                  <WordCard key={word._id} data={word} />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
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
        <AddWordDialog isOpen={isAddWordOpen} handleClose={() => setIsAddWordOpen(false)} onAddWordClick={onAddWordClick} />
      </div>
    </>
  );
};

export default Homepage;
