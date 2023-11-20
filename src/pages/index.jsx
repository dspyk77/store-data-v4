import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Page = () => {
  return (
    <Container>
      <div className="px-4 py-3 my-1 text-center">
        <img className="mb-3" src="img/store-data-logo.png" alt="" />
        <h1 className="display-5 fw-bold text-body-emphasis">Welcome!</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
          Welcome to Store Data v4! This version represents my entry into backend programming.
          It&apos;s centered around a product inventory system, emphasizing the core principles of
          CRUD (Create, Read, Update, Delete). Unlike its predecessor, version 3, which relied on
          Next.js and React, v4 incorporates a real MySQL database for enhanced backend
          functionality. To explore its capabilities, simply click the
          &apos;Get Started&apos; button.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button
              variant='dark'
              className="btn-lg px-4 gap-3"
              href="/products"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
