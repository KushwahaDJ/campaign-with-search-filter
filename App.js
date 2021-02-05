import "./App.css";
import Data from "./data.json";
import { useState } from "react";
import Pagination from "./Pagination";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  // Get current post

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Data.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="App">
      <div className="search-container">
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          className="searchBtn"
          placeholder="Search.."
          name="search"
        />
      </div>
      <table className="w3-table w3-striped">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Company Name</th>
            <th>Type</th>
            <th>last saved</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      {currentPosts
        .filter((val) => {
          if (searchTerm == "") {
            return val;
          } else if (
            val.name
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          ) {
            return val;
          }
        })
        .map((campaign) => {
          return (
            <div key={campaign._id}>
              <table className="w3-table w3-striped">
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{campaign.name}</td>
                    <td>{campaign.type}</td>
                    <td>date</td>
                    <td>action</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={Data.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
