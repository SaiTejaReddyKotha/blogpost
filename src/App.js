import Blog from './components//Blog.js';
import './App.css';
import createPost from './components/createPost.js';
import UserManagement from './components/UserManagement.js';

import * as React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="Main page">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              // <Blog
              //   data={data}
              //   selectedSection={selectedSection}
              //   setSelectedSection={setSelectedSection}
              // />
              <Blog />
            }
          />
          <Route exact path="createPost" Component={createPost} />
          <Route exact path="UserManagement" Component={UserManagement} />
        </Routes>
      </BrowserRouter>
      {/* <Blog /> */}
    </div>
  );
}

export default App;
