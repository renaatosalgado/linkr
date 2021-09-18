import styled from 'styled-components'
import Post from "./Post"
import NoPostFound from "../styled-components/NoPostsFound"
import Loader from 'react-loader-spinner'


const CenteredContainer = styled.div`
    min-width: 610px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CenteredLoader = () => {
    return (
        <CenteredContainer>
            <Loader type="ThreeDots" color="#151515" height={70} width={70}/>
        </CenteredContainer>
    )
}  
const Posts = ({ postsList, isLoadingPosts, setPostsList }) => { 
    return (
        isLoadingPosts ? <CenteredLoader /> : 
            postsList.length === 0 ? <NoPostFound>Nenhum post encontrado</NoPostFound> :
                postsList.map((post, index) => (
                    <Post
                        key={index}
                        post={post}
                        setPostsList={setPostsList}
                    />
                ))
    )
}


export default Posts