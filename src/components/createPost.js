import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Description from "./Description";

function CreatePost(props) {
  // State variables for the post form
  const [description, setDescription] = useState("");
  const [postForm, handlePostForm] = useState({
    title: "",
    Category: "",
  });

  // State variable for the label of the post button
  const [postbtnLabel, handlePostbtnLabel] = useState(true);
  const [btnClicked, setBtnClicked] = useState(false);

    // Handle the change of the post image (Event handler for file input)
  const changeHandler = (e) => {
    handlePostForm({ ...postForm, [e.target.name]: e.target.files[0] });
  };

  // Handle the input of the post form
  const inputHandler = (e) => {
    handlePostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the submission of the post form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the button label to show loading state
    handlePostbtnLabel(false);
    setBtnClicked(true);

    // Extract the form data to be sent to the server
    const { title, Category, image } = postForm;
    const postDetails = {
      title,
      Category,
      image,
      content: description,
      author: props.user.username,
    };
    console.log(postDetails)
    handlePostbtnLabel(true);
    alert("New post published");
    props.setcreatePost(false);
    props.setoptions(true)
  };

  return (
    <div className="container routeLayout p-3  createPost">
      {/* The post creation form */}
      <Form onSubmit={handleSubmit}>
        {/* Form input for post title */}
        <Form.Group className=" mb-4 mb-md-2">
          <Form.Label htmlFor="title">Post Title:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Post Heading"
            value={postForm.title}
            onChange={(e) => inputHandler(e)}
            name="title"
            id="title"
          />
        </Form.Group>

        {/* Form input for post image */}
        <Form.Group className=" mb-2">
          <Form.Label htmlFor="image">Post Image:</Form.Label>
          <Form.Control
            type="file"
            required
            name="image"
            onChange={changeHandler}
            id="image"
          />
        </Form.Group>
        {/* Form input for post category */}
        <Form.Group className=" mb-4 mb-md-2">
          <Form.Label htmlFor="Category">Post Category:</Form.Label>
          <Form.Select
            required
            value={postForm.Category}
            onChange={(e) => inputHandler(e)}
            name="Category"
            id="Category"
          >
            <option>Select the Category</option>
            <option value="Academic Resources">Academic Resources</option>
            <option value="Career Services">Career Services</option>
            <option value="Campus">Campus</option>
            <option value="Culture">Culture</option>
            <option value="Local Commnity Resources">Local Commnity Resources</option>
            <option value="Social">Social</option>
            <option value="Sports">Sports</option>
            <option value="Health and Wellness">Health and Wellness</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Alumni">Alumni</option>
          </Form.Select>
        </Form.Group>

        {/* Form input for post description */}
        <Form.Group className=" mb-2">
          <Form.Label>Post Description:</Form.Label>
          <Description setDescription={setDescription} />
        </Form.Group>

          <Button type="submit" disabled={btnClicked}>
            {postbtnLabel ? "Publish" : "Please Wait While publishing..."}
          </Button>
      </Form>
    </div>
  );
}

export default CreatePost;
