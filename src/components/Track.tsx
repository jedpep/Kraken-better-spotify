/* eslint-disable @next/next/no-img-element */
import { css } from "@emotion/css";
import { Artist, Track as TrackType } from "spotify-types";
import React from 'react';

const stylesFn = (viewstate: number) => {
  return {

    body: css`
      margin: 0;
      padding: 0;
    `,

    container: css`
      position: absolute;
      display: flex;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%; /* Make sure the container covers the whole screen */
      z-index: 2;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
      color: white;
      font-size: ${viewstate / 320}rem;
      background-size: cover;
    `,

    imageContainer: css`
      position: relative;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url('/Spotify_Logo_RGB_White.png');
  
    `,

    spotifyLogo: css`
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      width: 3em;
      opacity: .7;
    `,

    nowPlayingImage: css`
      width: 70%;
      boxshadow: 0 1.25em 2.5em rgb(0 0 0 / 30%), 0 1em 0.75em rgb(0 0 0 / 22%);
      display: none;
    `,

    textContainer: css`
      text-align: center;
      width: 90%;
    `,

    songTitle: css`
      position: absolute;
      bottom: 200px;
      left: 50%;
      transform: translateX(-50%);
      font-size: ${viewstate / 250}rem;
      font-family: Verdana, sans-serif;
      font-weight: 900 !important;
      margin-bottom: 0em;
    `,

    artists: css`
      position: absolute;
      bottom: 160px;
      left: 50%;
      transform: translateX(-50%);
      font-size: ${viewstate / 350}rem;
      font-weight: 900;
      margin-bottom: 0em;
      opacity: .7;
    `,

    album: css`
      font-size: 0.8em;
      font-weight: 700;
      margin-bottom: 0.25em;
      opacity: .9;
    `,

    blurBackground: css`
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: inherit;
      background-size: inherit;
      filter: blur(4px);
      z-index: -1;
    `,

    darkOverlay: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: -1;
    `,

    albumText: css`
      font-size: 0.8em;
      font-weight: 500;
      margin-top: -160px;
      opacity: .7;
    `,

    timestampText: css`
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      font-size: ${viewstate / 340}rem;
      font-family: Verdana, sans-serif;
      font-weight: 900 !important;
      margin-bottom: 0em;
    `
  };
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    let truncatedText = text.substring(0, maxLength);

    if (truncatedText.charAt(truncatedText.length - 1) === ' ') {
      truncatedText = truncatedText.substring(0, truncatedText.length - 1);
    }

    return truncatedText + "…";
  }
  return text;
};

function secondsToMinutesAndSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}

const Track = ({
  nowPlaying,
  imageRef,
  viewstate,
}: {
  viewstate: number;
  nowPlaying: TrackType;
  imageRef: React.RefObject<HTMLImageElement>;
}) => {

  const backgroundImageUrl = nowPlaying.album.images[0].url;
  const truncatedSongTitle = truncateText(nowPlaying.name, 23);

  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    margin: `0`,
    padding: `0`
  };

  const styles = stylesFn(viewstate);
  return (
    <div className={styles.container} style={containerStyle}>
      <div className={styles.blurBackground}></div>
      <div className={styles.darkOverlay}></div>
      <img
        className={styles.spotifyLogo}
        src="/spotify-small.png"
        alt="Spotify Logo"
      />
      <img
        className={styles.nowPlayingImage}
        alt=""
        src={nowPlaying.album.images[0].url}
        ref={imageRef}
      />
      <div className={styles.textContainer}>
        <p className={styles.albumText}>PLAYING FROM ALBUM</p>
        <p className={styles.album}>{nowPlaying.album.name.toUpperCase()}</p>
        <p className={styles.songTitle}>
          <b>
            <a
              href={nowPlaying.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
            >
              {truncatedSongTitle.toUpperCase()}
            </a>
          </b>
        </p>
        <p className={styles.artists}>
          {nowPlaying.artists &&
            nowPlaying.artists.map((artist: Artist, i: number) => {
              return (
                <a
                  key={`${i}-artists-link`}
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`${artist.name}${
                    i === nowPlaying.artists.length - 1 ? "" : ", "
                  }`}
                </a>
              );
            })}
        </p>
        <p className={styles.timestampText}>
        {secondsToMinutesAndSeconds(Math.floor(nowPlaying.duration_ms / 1000))}
        </p>
      </div>
    </div>
  );
};

export default Track;
