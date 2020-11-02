# Devetry: A COMP 426 Project
Devetry (a portmanteau of developer and poetry) is a geeky, digitally-native poetry zine that allows programmers to write poems in code. Using JavaScript, Devetry renders each poem dynamically, giving authors control over how their audience interacts with their poetry. Users can view and dynamically interact with each poem, add comments, like poems, and write their own poems for public or private audiences.

Check out a YouTube video of the app in action [here](https://youtu.be/tme3ibyYCdU).

## Functionality
### HTML input field with autocomplete and debouncing 
Devetry has a search bar where users can look up poems by title or author (user). 
### Signup process with account creation and log in
Users have to be registered to comment and submit poems. Devetry stores additional data to associate users with their comments and poems.
### CRUD functionality
- Public: Unregistered users can perform CRUD operations on likes for each poem
- Private: Registered users can also publish poems (either for public or private audience), and perform CRUD operations on comments for each poem by posting and replying to comments.
- User: Each user has exclusive access to their in-progress and user-private poems.
### Dynamic data source
The poems will be contained in a frame, and users can view the rendered version, which is dynamically inserted into the DOM.
### 3rd party API
When submitting a poem, users are presented a random word (pulled from the Random Word API) for inspiration.

## Design
Devetry was built using the Bulma CSS framework. This gives it a clean, modern feel that is perfect for today’s tech-literate poet.
