const CoverLetterPage = async ({ params }) => {
    const id = params?.id; // No need to await

    return (
        <div>CoverLetter: {id}</div>
    );
};

export default CoverLetterPage;
