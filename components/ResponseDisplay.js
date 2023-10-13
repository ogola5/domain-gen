// File: /components/ResponseDisplay.js
const ResponseDisplay = ({ data, error, loading }) => {
  let content;

  if (loading) {
    content = "Loading...";
  } else if (error) {
    content = `Error: ${error.message}`;
  } else if (data) {
    console.log("Data from OpenAI API in display: ", data.result);

    content = (
      <>
        <p>Domain Name: {data.result.domainName}</p>
        <p>Initials Used: {data.result.initials}</p>
        <p>Step-by-Step Instructions:</p>
        <ul>
          {data.result.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
        <p>Monetization Options: {data.result.monetization}</p>
      </>
    );
  } else {
    content = "";
  }

  return <div className="response-display">{content}</div>;
};

export default ResponseDisplay;
