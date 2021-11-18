
export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
            fields {
                slug
            }
        }
    }
`

useEffect(() => {
    firestore
      .collection(`comments`)
      .onSnapshot(snapshot => {
        const posts = snapshot.docs
        .filter(doc => doc.data().slug === slug)
        .map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setComments(posts)
      })
}, [slug])
useEffect(() => {
    const cleanUp = firestore
      .doc(`comments/${slug}`)
      .collection("comments")
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setComments(posts)
      })
    return () => cleanUp()
  }, [slug])
const slug = post.fields.slug.substring(1, post.fields.slug.length - 1)

return (
    <Layout>
        <div className="container">
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <Comments comments={comments} slug={slug} />
        </div>
    </Layout>
    )
 
