import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  let createHandler;

  beforeEach(() => {
    createHandler = jest.fn();
    render(<BlogForm createBlog={createHandler} />);
  });

  test("blog form calls create handler with correct data", async () => {
    const user = userEvent.setup();

    const title = screen.getByLabelText("title");
    const author = screen.getByLabelText("author");
    const url = screen.getByLabelText("url");
    const submitButton = screen.getByText("create");

    await user.type(title, "test title");
    await user.type(author, "test author");
    await user.type(url, "test url");
    await user.click(submitButton);

    expect(createHandler.mock.calls).toHaveLength(1);

    const blog = createHandler.mock.calls[0][0];
    expect(blog.title).toBe("test title");
    expect(blog.author).toBe("test author");
    expect(blog.url).toBe("test url");
  });
});
