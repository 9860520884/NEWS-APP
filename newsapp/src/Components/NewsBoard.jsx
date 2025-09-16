import { useEffect, useState } from "react"
import { Newsitem } from "./Newsitem";


const NewsBoard = () => {
  
  const [articles, setArticles] = useState([])

  useEffect(() =>{

   let url ='GET https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}';
   fetch(url).then(response=> response.json(data)).then(data =>setArticles(data.articles));

  },[])


  return (
    <div>
   <h2 className="text-center">Latest<span className="badge bg-danger">News</span></h2>
    {articles.map((news,index)=>{

   return<Newsitem key={index} title={news.title} description={news.description} src={news.urlToImage} url ={news.url}/>

    })}


    </div>
  )
}
export default NewsBoard