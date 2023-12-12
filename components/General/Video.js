import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Video = ({ blok }) => (
  <div className={`${blok.outer_classes}`} {...storyblokEditable(blok)}>
    {
      blok.title && (
        <h2 id="title" className={`${blok.title_classes}`}>
          {blok.title}
        </h2>
      )
    }
    <div className={`flex flex-col`} id="body-container">
      <video id="myVideo" poster={blok.poster.filename} controls>
        <source src={blok.source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
);
 
export default Video;
