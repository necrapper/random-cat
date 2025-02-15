import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";


type Props = {
    initialImageUrl: string;
}
const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);


    const handleClick = async() =>{
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    }



  return (
    <div className={styles.page}>
        <button onClick={handleClick} className={styles.button}>Another one!</button>
        <div className={styles.frame}>
            {loading || <img src={imageUrl} className={styles.img} />}
        </div>
    </div>);
};
export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const initialImage = await fetchImage();
    return {
        props: {
            initialImageUrl: initialImage.url
        }
    }
}

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thedogapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
  };;