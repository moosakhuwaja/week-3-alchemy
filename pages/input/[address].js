import { getAddressType } from "../../utils/addressType";
import Address from "../../components/Address";
import Block from "../../components/Block";
import Wallet from "../../components/Wallet";
const AddressPage = ({ address, addressType }) => {
  return (
    <div>
      {addressType === "Transaction Hash" && <Address address={address} />}

      {addressType === "Block Number" && (
        <Block blockNumber={parseInt(address)} />
      )}
      {addressType === "Unknown Type" && <Wallet />}

      {/* Add more content based on the address type */}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const address = params.address;

  // Determine the type of the address
  const addressType = getAddressType(address);

  // Fetch additional data based on the address if needed

  return {
    props: {
      address,
      addressType
    }
  };
}

export default AddressPage;
