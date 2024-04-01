import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import newsController from "../Controller/newsController";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function NewsCard() {
  const [news, setNews] = useState([]);
  const { newsSearch } = useParams();

  async function getNews(target) {
    try {
      let result = await newsController.GetNews(target);
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
    async function fetchData(target) {
      console.log("news search", newsSearch);
      let data;
      //console.log("searchQuery",searchQuery);
      if (newsSearch.length > 0) {
        data = await getNews(newsSearch);
      } else {
        data = await getNews();
      }

      setNews(data.articles);
    }
    fetchData();
  }, [newsSearch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2} justifyContent="center" mt={2}>
        {news.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 345,
<<<<<<< HEAD
                marginTop: "20px",
                margin: "auto",
              }}
              style={{
                height: "360px",
                overflow: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
=======
                height: "500px",
                marginTop: "20px",
                margin: "auto",
              }}
>>>>>>> cde703a59651207761ca9e7e49899b251cc75414
              onClick={() => handleClick(item.url)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
<<<<<<< HEAD
                  height="140"
=======
                  height="50"
>>>>>>> cde703a59651207761ca9e7e49899b251cc75414
                  image={item.urlToImage}
                  alt="News Image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}{" "}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
