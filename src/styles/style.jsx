export const styles = {
  container: {
    border: { xs: 0, md: 1 },
    borderColor: "gray",
    my: 5,
    borderRadius: 2,
   
  },
  appname: {
    fontSize: { xs: 25, md: 30, lg: 45 },
  },
  iconbutton: {
    display: "block",
    mx: "auto",
    my: 2,
  },
  skeleton: {
    my: 4,
    height: 42,
  },
  tocurrency: {
    text: {
      fontSize: { xs: 20, lg: 28 },
      display: "flex",
      gap: 1,
      justifyContent: "start",
      alignItems: "center",
    },
    image: {
      width: { xs: 20, md: 25, lg: 30 },
      // height: { xs: 20, md: 25, lg: 30 }
    },
  },
  fromcurrency: {
    text: {
      fontSize: {
        xs: 25,
        md: 30,
        lg: 32,
      },
      py: 1,
      display: "flex",
      gap: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: { xs: 20, md: 25, lg: 30 },
      height: { xs: 20, md: 25, lg: 25 },
    },
  },
  rate: {
    fontSize: { xs: 20, md: 22, lg: 25 },
  },
};
