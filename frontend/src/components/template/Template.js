import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function Template(props) {
  return (
    <>
      <Header cart={props.cart} setCart={props.setCart}/>
      <Content>{props.children}</Content>
      <Footer />
    </>
  );
}

export default Template;
