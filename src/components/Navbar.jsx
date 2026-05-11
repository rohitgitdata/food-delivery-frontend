function Navbar() {

  return (

    <div style={{
      display:'flex',
      justifyContent:'space-between',
      padding:'20px',
      background:'orange',
      color:'white'
    }}>

      <h2>Food Delivery</h2>

      <div>
        Cart
      </div>

    </div>
  );
}

export default Navbar;