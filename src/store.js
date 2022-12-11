import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
    tagTypes: ["Posts"],
    endpoints: (builder) => ({
        getAll: builder.query({
            query: () => `posts`,
            providesTags: [{ type: "Posts", id: "LIST" }]
        }),
        updatePost: builder.mutation({
            query(post) {
                return {
                    url: `posts/${post.id}`,
                    method: "PUT",
                    body: post,
                }
            },
            invalidatesTags: [{ type: "Posts", id: "LIST" }]
        }),
        deletePost: builder.mutation({
            query(post) {
                return {
                    url: `posts/${post.id}`,
                    method: "DELETE",
                    body: post,
                }
            },
            invalidatesTags: [{ type: "Posts", id: "LIST" }]
        }),
        addPost: builder.mutation({
            query(title) {
                return {
                    url: `posts`,
                    method: "POST",
                    body: {
                        title
                    },
                }
            },
            invalidatesTags: [{ type: "Posts", id: "LIST" }]

        })
    })
})