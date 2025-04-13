import { baseApi } from '../../services/baseApi';

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch notes sorted by position
    getNotes: builder.query({
      query: () => ({
        url: '/notes',
        method: 'GET',
      }),
      providesTags: ['Notes'],
    }),

    // Add new note
    createNote: builder.mutation({
      query: (data) => ({
        url: '/notes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Notes'],
    }),

    //Edit Note
    updateNote: builder.mutation({
        query: ({ _id, title, content }) => ({
          url: `/notes/${_id}`,
          method: 'PUT',
          body: { title, content },
        }),
        invalidatesTags: ['Notes'],
      }),

    // Reorder notes
    reorderNotes: builder.mutation({
      query: (reorderedNotes) => ({
        url: '/notes/reorder',
        method: 'PUT',
        body: { reorderedNotes },
      }),
      invalidatesTags: ['Notes'],
    }),

    // Delete note (optional)
    deleteNote: builder.mutation({
        query: (id) => ({
          url: `/notes/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Notes'],
      }),      
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useReorderNotesMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation
} = noteApi;
