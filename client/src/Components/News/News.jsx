import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import noImg from "../../assets/No_Image_Available.jpg";
import LeftHeader from "./NewsLeftComponent";

export default function News() {
  const [news, setNews] = useState([]);
  const { newsSearch } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedHeadline, setSelectedHeadline] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [headlines, setHeadlines] = useState([
    "India",
    "World",
    "Local",
    "Business",
    "Technology",
    "Entertainment",
    "Sports",
    "Science",
  ]);

  // Handler function for headline click
  const handleHeadlineClick = async (headline) => {
    setSelectedHeadline(headline);
    setLoading(true); // Set loading to true while fetching new data
    try {
      const data = await getNews(headline === "local" ? "indore" : headline);
      const filteredArticles = data.articles.filter(
        (article) => article.title !== "[Removed]"
      );
      setNews(filteredArticles);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false); // Set loading to false if an error occurs
    }
  };

  async function getNews(target) {
    try {
      let result = fetch(`http://localhost:4000/api/news/${target}`).then(
        (data) => data.json()
      );

      return result;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  }

  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData(target) {
      console.log("news search", newsSearch);
      let data;
      if (newsSearch.length > 0) {
        console.log("hii");
        data = await getNews(newsSearch);
      } else {
        console.log("hii 2");
        data = await getNews("Indore");
      }
      const filteredArticles = data.articles.filter(
        (article) => article.title !== "[Removed]"
      );
      setNews(filteredArticles);
      setLoading(false);
    }
    fetchData();
  }, [newsSearch, token]);

  return (
    <>
      <Box display="flex">
        <Box
          position="sticky"
          top={0}
          zIndex={1}
          display="flex"
          justifyContent="flex-start"
          bgcolor="#fff"
          borderBottom="1px solid #ddd"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <LeftHeader
            headlines={headlines}
            selectedHeadline={selectedHeadline}
            handleHeadlineClick={handleHeadlineClick}
          />
        </Box>
        <Box flex="1">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Grid container spacing={2} justifyContent="center" mt={2}>
              {loading
                ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ maxWidth: 345, margin: "auto" }}>
                        <Skeleton
                          variant="rectangular"
                          height={200}
                          animation="wave"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            <Skeleton animation="wave" />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <Skeleton animation="wave" />
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                : news.slice(10).map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          maxWidth: 345,
                          marginTop: "20px",
                          margin: "auto",
                        }}
                        style={{
                          height: "420px",
                          overflow: "scroll",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                        onClick={() => handleClick(item.url)}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            style={{ height: "200px", objectFit: "cover" }}
                            image={item.urlToImage ? item.urlToImage : noImg}
                            alt="News Image"
                          />

                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}{" "}
                            </Typography>
                            <hr
                              style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                borderColor: "#ddd",
                              }}
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              mt={1}
                            >
                              Author: {item.author ? item.author : "Unknown"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Published:{" "}
                              {new Date(item.publishedAt).toLocaleString()}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
