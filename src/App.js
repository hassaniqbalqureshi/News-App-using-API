import { useState, useEffect } from "react";
import React from "react";
import './index.css'
const App = () => {
  const [news, setNews] = useState([]);
  const [searchNews, setSearch] = useState('')
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=USA')
  const [loading, setLoading] = useState(false)

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error))
  };
  useEffect(() => {
    fetchNews()
  }, [url])
  const handleChange = e => {
    setSearch(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchNews}`)
  }

  return (
    <div>
      <h2>NEWS</h2>
      {loading ? <p class="loader"><h2>Loading</h2></p> : ""}
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchNews} onChange={handleChange} />
        <button>Search</button>
      </form>
      {
        news.map((n, i) => (<p key={i}>{n.title}</p>))
      }
    </div>
  )
};
// const App = () => {
//   useEffect(() => {
//     document.title = `clicked ${count} time`;
//   })
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1);
//   }
//   return (
//     <div className="App">
//       <button onClick={increment}>
//         Button click {count} times;
//       </button>
//     </div>
//   )


// };

// class App extends Component {
//   state = {
//     count: 0,
//   }
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1,
//     })
//   }
//   render() {
//     return (
//       <div className="App">
//         <button onClick={this.increment}>
//           Button click {this.state.count} times;
//         </button>
//       </div>
//     );
//   }
// }

export default App;
