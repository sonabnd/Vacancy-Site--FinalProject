const HomepageCard = ({ post }) => {
  return (
    <>
      <div className="advertisement-loqo">S</div>
      <div className="advertisement-position-company">
        <p className="position-name">{post.position}</p>
        <p className="company-name">{post.company}</p>
        <span>{post.location} |</span>
        <span className="deadline">Son müraciət tarixi : {post.deadline}</span>
      </div>
      <p className="price">{post.salary}</p>
    </>
  );
};

export default HomepageCard;
