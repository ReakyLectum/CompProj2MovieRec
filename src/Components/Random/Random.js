import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from "../Config/config";
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./ContentModal.css";
import Carousel from "../Carousel/Carousel";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: '#282c34',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
};

export default function TransitionsModal({ children, media_type, id }) {
    const [content, setContent] = useState();
    const [video, setVideo] = useState();


    const fetchData = async () => {
        const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setContent(data);
      // console.log(data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
      // eslint-disable-next-line
    }, []);

    return (
        <>
        <div
            className="media"
            style={{ cursor: "pointer" }}
            color="inherit"
            onClick={handleOpen}
        >
            {children}
        </div>
    <div>
        <Box sx={style}>
        {content && (
            <div className="ContentModal">
                <img
                src={
                content.poster_path
                    ? `${img_500}/${content.poster_path}`
                    : unavailable
                }
                alt={content.name || content.title}
                className="ContentModal__portrait"
            />
            <img
                src={
                content.backdrop_path
                    ? `${img_500}/${content.backdrop_path}`
                    : unavailableLandscape
                }
                alt={content.name || content.title}
                className="ContentModal__landscape"
            />
                <div className="ContentModal__about">
                <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                    ).substring(0, 4)}
                    )
                </span>
                {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                )}

                <span className="ContentModal__description">
                    {content.overview}
                </span>

                <div>
                    <Carousel id={id} media_type={media_type} />
                </div>

                <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                >
                    Watch the Trailer
                </Button>
                </div>
            </div>
        )}
        </Box>
        </div>
        </>
    );
}