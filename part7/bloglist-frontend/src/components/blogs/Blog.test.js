import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  let blog;
  let likeHandler;
  let removeHandler;
  let currentUser;

  beforeEach(() => {
    blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 3,
      user: {
        username: "testuser",
        name: "test user",
      },
    };

    currentUser = {
      username: "testuser",
    };

    likeHandler = jest.fn();
    removeHandler = jest.fn();
    component = render(
      <Blog
        blog={blog}
        handleLike={likeHandler}
        removeBlog={removeHandler}
        currentUser={currentUser}
      />
    );
  });

  test("renders title and author but not URL or likes by default", () => {
    expect(component.container).toHaveTextContent("test title");
    expect(component.container).toHaveTextContent("test author");
    const div = component.container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("url and likes are shown after view button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");

    expect(component.container).toHaveTextContent("test url");
    expect(component.container).toHaveTextContent("3");
  });

  test("clicking the like button twice calls like handler twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
