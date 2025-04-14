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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newNote } = await queryFulfilled;
          dispatch(
            noteApi.util.updateQueryData('getNotes', undefined, (draft) => {
              draft.push(newNote); // add new note to cached notes
            })
          );
        } catch {}
      }
    })
    ,

    //Edit Note
    updateNote: builder.mutation({
      query: ({ _id, title, content }) => ({
        url: `/notes/${_id}`,
        method: 'PUT',
        body: { title, content },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedNote } = await queryFulfilled;
          dispatch(
            noteApi.util.updateQueryData('getNotes', undefined, (draft) => {
              const index = draft.findIndex((n) => n._id === updatedNote._id);
              if (index !== -1) draft[index] = updatedNote;
            })
          );
        } catch {}
      }
    })
    ,

    // Reorder notes
    reorderNotes: builder.mutation({
      query: (reorderedNotes) => ({
        url: '/notes/reorder',
        method: 'PUT',
        body: { reorderedNotes },
      }),
      async onQueryStarted(reorderedNotes, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
    
          dispatch(
            noteApi.util.updateQueryData('getNotes', undefined, (draft) => {
              // reorder the cached notes manually
              const map = {};
              reorderedNotes.forEach((n) => {
                map[n._id] = n.position;
              });
    
              draft.sort((a, b) => (map[a._id] ?? a.position) - (map[b._id] ?? b.position));
            })
          );
        } catch (err) {
          console.error('Reorder failed', err);
        }
      }
    })
    ,

    // Delete note (optional)
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            noteApi.util.updateQueryData('getNotes', undefined, (draft) => {
              return draft.filter((note) => note._id !== id);
            })
          );
        } catch {}
      }
    })
    ,      
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useReorderNotesMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation
} = noteApi;
