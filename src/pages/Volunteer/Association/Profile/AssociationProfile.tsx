import { useParams } from 'react-router-dom';

function AssociationProfile() {
  const { associationID } = useParams();

  return (
    <div>
      <h1>Association Profile</h1>
      <p>ID: {associationID}</p>
    </div>
  );
}

export default AssociationProfile;