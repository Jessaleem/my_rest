const IntroPage = () => (
  <>
  <div className="flex flex-col items-center justify-center">
    <div className="block">
      <img className="static my-20" src="https://res.cloudinary.com/jessaleem/image/upload/v1664080130/my_restaurant/Mi_proyecto-removebg-preview_tir8jh.png" />
    </div>
    <div className="relative border-8 border-goldBorder justify-center">
      <h1 className="flex align-middle justify-center text-slate-300 font-mono items-center">Enjoy a unique gastronomic experience </h1>
    <img src="https://res.cloudinary.com/jessaleem/image/upload/v1664081568/my_restaurant/arabescos_bareh4.webp" />
    </div>
    <div className="flex flex-row justify-around mt-20">
      <div className="m-4 bg-white bg-opacity-25 w-96 text-center">
        <h1 className="text-goldBorder mt-5">About us</h1>
        <p className="text-goldBorder text-lg my-20">
        We are a proposal that will make you feel like in the Mediterranean, all our dishes are prepared with fresh ingredients from the region. We have a wide variety of fish and seafood prepared with the techniques and spices of the Mediterranean. We are located in Barranquilla, Colombia.
        Come and live with us this unique gastronomic experience.  
        </p>
      </div>
      <div className="m-4 bg-white bg-opacity-25 w-96 text-center">
      <h1 className="text-goldBorder mt-5">Opening hours</h1>
        <p className="text-goldBorder text-lg my-20 ">
          Monday - Thursday
          11:30 am - 11:00 pm
          Friday - Saturday
          11:30 am - 11:00 pm
          Delivery
          1:00 pm - 10:00 pm
        </p>
      </div>
    </div>
  </div>
  </>
)

export default IntroPage;