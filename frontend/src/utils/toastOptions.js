const options = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
}

export const getToastOptions = () => {
  if(document.body.classList.contains('dark')) {
    return {...options, theme: "dark"};
  } else {
    return options;
  }
}