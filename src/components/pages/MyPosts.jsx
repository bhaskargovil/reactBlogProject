import React, { useState, useEffect } from "react";
import service from "../../appwrite/auth_service_doc";
import Container from "../container/Container";
import Postcard from "../elements/Postcard";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.userData)

  useEffect(() => {
    service.getPosts([]).then((postList) => {
      if (postList) setPosts(postList.documents);
    });
  }, []);

  return (
    <>
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => {
              if (post.userID == userData.$id) {
                return (
                  <div key={post.$id} className="p-2 w-1/4">
                    <Postcard {...post} />
                  </div>
                );
              }
            })}
          </div>
        </Container>
      </div>
    </>
  );
}

export default AllPosts;
