import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const ITEMS = [
  { name: "Jay", src: "jay_2.webp" },
  { name: "Chad", src: "Chad 3.jpeg" },
  { name: "Jay", src: "jay.jpg" },
  { name: "Chad", src: "Chad 4.jpeg" },
  { name: "Rob", src: "rob_alvarez_2.jpeg" },
  { name: "Chad", src: "Chad 5.jpeg" },
  { name: "Jay", src: "jay_3.webp" },
  { name: "Chad", src: "Chad 6.jpeg" },
  { name: "Rob", src: "rob_alvarez_1.jpeg" },
  { name: "Jay", src: "jay_1.jpeg" },
  { name: "Chad", src: "Chad rockin.jpeg" },
  { name: "Jay", src: "takecover_drum.jpg" },
  { name: "Group", src: "takecover_group.jpg" },
];


const VIDEO_URLS = [
  "https://www.youtube.com/embed/wKPn5tYczjY",
  "https://www.youtube.com/embed/uPLO5Rw1h5c",
  "https://www.youtube.com/embed/Bu3uq56zWpk",
  "https://www.youtube.com/embed/Q5SBVhpT4ls",
];

function VideoPanel({ src }) {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 py-4 py-lg-0">
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          aspectRatio: "16/9",
          borderRadius: 12,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <iframe
          title="Take Cover Band Showcase"
          src={src}
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allowFullScreen
        />
      </div>
    </div>
  );
}

function Item({ item }) {
  return (
    <Paper elevation={3} style={{ borderRadius: 12, overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: 420,
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <img
          alt={item.name}
          src={`/images/${item.src}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
      </div>
    </Paper>
  );
}

function PictureGallery() {
  return (
    <div className="container-fluid m-0 px-3 px-lg-5 mb-5">
      <h1 className="text-secondary text-center mt-5 mb-4 fw-bold">
        See the Band in Action
      </h1>
      <div className="row align-items-center g-4">
        {/* Left videos */}
        <div className="col-12 col-lg-4 d-flex flex-column gap-3">
          <VideoPanel src={VIDEO_URLS[0]} />
          <VideoPanel src={VIDEO_URLS[2]} />
        </div>

        {/* Center carousel */}
        <div className="col-12 col-lg-4">
          <Carousel
            autoPlay
            animation="slide"
            interval={4000}
            navButtonsAlwaysVisible
            sx={{ borderRadius: 3, overflow: "hidden" }}
          >
            {ITEMS.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </div>

        {/* Right videos */}
        <div className="col-12 col-lg-4 d-flex flex-column gap-3">
          <VideoPanel src={VIDEO_URLS[1]} />
          <VideoPanel src={VIDEO_URLS[3]} />
        </div>
      </div>
    </div>
  );
}

export default PictureGallery;