import styled from "styled-components";

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 5px 20px;
  border-radius: 15px;
  width: 800px;
  height: 100%;
  &.full {
    border: 3px solid #afaeae;
  }
  @media (max-width: 1550px) {
    margin-top: 50px;
  }
  @media (max-width: 750px) {
    width: 100%;
  }

  @media (max-width: 375px) {
    padding: 10px 3px;
  }

  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 20%;
    .icon {
      margin-right: 5px;
      img {
        @media (max-width: 375px) {
          width: 50px;
          height: 50px;
        }
      }
    }
  }

  .right {
    /* border: 1px solid #afaeae; */
    padding: 5px;
    border-radius: 5px;
    width: 82%;

    input {
      border: none;
      width: 500px;

      &:focus {
        outline: none;
        padding: 10px 5px;
      }

      @media (max-width: 750px) {
        width: 90%;
      }

      @media (max-width: 450px) {
        font-size: 12px;
      }
    }

    button {
      border: none;
      background: transparent;
      cursor: pointer;

      .fa-search {
        color: #212121;
      }
    }
  }
`;

export const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;

  .info {
    h2 {
      font-size: 28px;
      color: #212121;
      text-align: center;
      padding: 20px 0;

      span {
        font-size: 20px;
        padding-bottom: 15px;
      }
    }
    .swiper-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 30px;
      width: 800px;
      position: relative;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.15);
      z-index: 1;
      border-radius: 20px;

      &:before {
        content: "";
        position: absolute;
        background: inherit;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: -20px;
        box-shadow: inset 0 0 500px rgba(255, 255, 255, 0.4);
        filter: blur(5px);
        z-index: -1;
      }

      @media (max-width: 840px) {
        width: 600px;
      }
      @media (max-width: 620px) {
        width: 500px;
      }

      @media (max-width: 520px) {
        width: 400px;
      }

      @media (max-width: 425px) {
        width: 100%;
      }

      .swiper-wrapper {
        .swiper-slide {
          width: 50px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          img {
            margin: 10px 0;
          }

          @media (max-width: 840px) {
            width: 90px;
          }

          h3 {
            color: #212121;
            padding-top: 15px;
          }

          h4 {
            color: #fff;
            padding-bottom: 10px;
          }
        }
      }
    }
    .temp {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h2 {
        font-size: 90px;
        color: #fff;
        position: relative;
        width: 100px;

        span {
          position: absolute;
          top: 20%;
        }
      }
    }

    .date {
      h2 {
        color: #212121;
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 20px;
      }
    }
  }

  .days-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .days {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 25%;

      @media (max-width: 555px) {
        width: 100%;
      }

      h3 {
        color: #212121;
        font-size: 23px;
        padding: 10px 0;
        margin: 0 50px;
        @media (max-width: 555px) {
          margin: 0 15px;
        }
      }

      h4 {
        color: #fff;
        font-size: 20px;
        padding: 5px 0;
      }
    }
  }
`;
