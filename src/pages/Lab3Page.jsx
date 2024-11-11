import {data} from '../data/module-data';
import { Card } from 'react-bootstrap';
import FlexContainer from '../components/FlexContainer';


const Lab3Page = () => {
    const Item = ({ name, id }) => (
      <Card style={{ width: '100%' }} className="border mb-3 p-3">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>ID: {id}</Card.Text>
        </Card.Body>
      </Card>
    );
  
    return (
      <div className="container mt-4">
        <h1>Lab 3</h1>
        <FlexContainer element={Item} data={data} />
      </div>
    );
  };
  
  export default Lab3Page;
