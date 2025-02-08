import { createStore } from "vuex";
import Swal from "sweetalert2";
export default createStore({
  state: {
    token: localStorage.getItem("token"),
    logedIn: false,
    isLoading: false,
    _id: "",
    username: "",
    email: "",
    telephone: "",
    name: "",
    row: "",
    position: "",
    cart:JSON.parse(localStorage.getItem("cart")) || [],
    total:JSON.parse(localStorage.getItem("total")) || 0,
    total_main:JSON.parse(localStorage.getItem("totalMain")) || 0,
    total_partner:JSON.parse(localStorage.getItem("totalPartner")) || 0,
    total_pv:JSON.parse(localStorage.getItem("totalPV")) || 0,
    total_main_pv:JSON.parse(localStorage.getItem("totalMainPV")) || 0,
    total_partner_pv:JSON.parse(localStorage.getItem("totalPartnerPV")) || 0,
    dialog : true,
    code: "???",
    me: {},
  },

  getters: {
    token: (state) => state.token,
    logedIn: (state) => state.logedIn,
    isLoading: (state) => state.isLoading,
    _id: (state) => state._id,
    username: (state) => state.username,
    email: (state) => state.email,
    telephone: (state) => state.telephone,
    name: (state) => state.name,
    row: (state) => state.row,
    position: (state) => state.position,
    cart:(state)=>state.cart,
    total:(state)=>state.total,
    total_main:(state)=>state.total_main,
    total_partner:(state)=>state.total_partner,
    total_pv:(state)=>state.total_pv,
    total_main_pv:(state)=>state.total_main_pv,
    total_partner_pv:(state)=>state.total_partner_pv,
    dialog:(state)=>state.dialog,
    code:(state) => state.code,
    me:(state) => state.me
  },
  mutations: {
    setToken(state, item) {
      state.token = item;
    },
    setLogin(state, item) {
      state.logedIn = item.logedIn;
      state.token = item.token;
      state._id = item._id;
      state.username = item.username;
      state.email = item.email;
      state.telephone = item.telephone;
      state.name = item.name;
      state.row = item.row;
      state.position = item.position;
      state.me = item.me;
      state.code = item.code;
    },
    setLoading(state, item) {
      state.isLoading = item;
    },
    setLoginDefault(state) {
     
      state.logedIn = false;
      state.token = "";
      state._id = "";
      state.username = "";
      state.email = "";
      state.telephone = "";
      state.name = "";
      state.row = "";
      state.state = false;
      state.me = {};
      state.code = "???";
      // localStorage.clear();
    },

    setDecodedToken(state, decodedToken) {
      state.decodedToken = decodedToken;
    },

    //เกี่ยวกับตะกร้าสินค้า
    addToCart(state, item) {
      
      //ต้องเช็คก่อนว่ามีสินค้านี้ในตะกร้าหรือยัง
      const index = state.cart.findIndex((product) => product.product_id === item.product.product_id_fk);  
      if (index === -1) {
         //เช็คว่า สินค้ามีพอหรือเปล่า
        /* if(item.product.product_stock < item.quantity){
          //ใช้ swal แจ้งเตือนว่าสินค้าไม่พอ
          Swal.fire({
            icon: "error",
            title: "สินค้ามีไม่พอ!",
            text: "สินค้ามีไม่พอในสต็อก!",
          });
          return
        } */
        //หากไม่มีสินค้าในตะกร้าให้เพิ่มสินค้าเข้าไปใหม่
        const product = {
          product_id: item.product.product_id_fk , //(รหัสสินค้า)
          product_image: item.product.product_image, //(รูปสินค้า)
          product_name: item.product.product_name ,//(ชื่อสินค้า)
          product_store: item.product.product_store,//(เป็นคลังของใคร)
          product_partner_id: item.product.product_partner_id,//(ของ partner คนไหน ถ้า null แสดงว่า ไม่มี )
          product_stock:item.product.product_stock, //(สต็อกสินค้า)
          sharelinkcode : item.sharelinkcode, //(รหัสคนแชร์ลิงค์)
          promotioncode: "",//(รหัสโปรโมชั่น)
          product_price:parseFloat(item.product.selling_price),//(ราคาสินค้า)
          product_qty :item.quantity, //(จำนวน)
          product_title: item.product.title,
          product_pv: item.product.pv,
          product_totalprice:parseFloat(item.product.selling_price)*item.quantity //(ราคารวม) 
        }
        state.cart.push(product);
        //แจ้งเตือนว่าสินค้าถูกเพิ่มเข้าไปในตะกร้าแล้ว
       /*  Swal.fire({
          icon: "success",
          title: "เพิ่มสินค้าเข้าตะกร้าสำเร็จ!",
          text: "สินค้าถูกเพิ่มเข้าตะกร้าแล้ว!",
        }); */

      } else {
        //เช็คว่า สินค้ามีพอหรือเปล่า
        if(item.product.product_stock < state.cart[index].quantity+item.quantity){
          //ใช้ swal แจ้งเตือนว่าสินค้าไม่พอ
          Swal.fire({
            icon: "error",
            title: "สินค้ามีไม่พอ!",
            text: "สินค้ามีไม่พอในสต็อก!",
          });
          return
        }
        //หากมีสินค้านี้ในตะกร้าแล้ว ให้เพิ่มจำนวนสินค้า
        state.cart[index].product_qty += item.quantity;
        state.cart[index].product_totalprice += item.product.selling_price*item.quantity;
        state.cart[index].product_stock =  item.product.product_stock
        if(state.cart[index].sharelinkcode == ''){
          state.cart[index].sharelinkcode = item.sharelinkcode
        }
        //แจ้งเตืิอนว่าสินค้าถูกเพิ่มเข้าไปในตะกร้าแล้ว
        /* Swal.fire({
          icon: "success",
          title: "เพิ่มสินค้าเข้าตะกร้าสำเร็จ!",
          text: "สินค้าถูกเพิ่มเข้าตะกร้าแล้ว!",
        }); */
      }
      
      //รวมราคาสินค้าทั้งหมด
      state.total = state.cart.reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_main = state.cart.filter(x=>x.product_store !== 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_pv = state.cart.reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      state.total_main_pv = state.cart.filter(x=>x.product_store !== 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      // console.log(state.cart)

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv));
      localStorage.setItem("totalMain", JSON.stringify(state.total_main));
      localStorage.setItem("totalMainPV", JSON.stringify(state.total_main_pv));
    },

    addToPartnerCart(state, { product, quantity, sharelinkcode }) {
      const index = state.cart.findIndex((p) => p.product_id === product._id);  
      if (index === -1) {
        const productp = {
          product_id: product._id ,
          //product_images: product.images,
          product_image: product.image,
          product_name: product.name,
          product_store: 'partner',
          product_partner_id: product.partner_id,
          product_partner_name: product.shop_name,
          product_stock:product.stock,
          sharelinkcode: sharelinkcode,
          product_price: parseFloat(product.selling_price),
          product_qty: quantity,
          product_title: product.description,
          product_pv: product.pv,
          product_totalprice:parseFloat(product.selling_price)*quantity
        }
        state.cart.push(productp);
      } else {
        if(product.stock < state.cart[index].quantity+quantity){
          Swal.fire({
            icon: "error",
            title: "สินค้ามีไม่พอ!",
            text: "สินค้ามีไม่พอในสต็อก!",
          });
          return
        }
        state.cart[index].product_qty += quantity;
        state.cart[index].product_totalprice += product.selling_price*quantity;
        state.cart[index].product_stock =  product.stock
        if(state.cart[index].sharelinkcode === ''){
          state.cart[index].sharelinkcode = product.sharelinkcode
        }
      }
      state.total = state.cart.reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_partner = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_pv = state.cart.reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      state.total_partner_pv = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv));
      localStorage.setItem("totalPartner", JSON.stringify(state.total_partner));
      localStorage.setItem("totalPartnerPV", JSON.stringify(state.total_partner_pv));
    },
    addquantity(state,item){
      const index = state.cart.findIndex((product) => product.product_id === item.product_id);  
      if(item.product_stock < state.cart[index].product_qty+1){
        //ใช้ swal แจ้งเตือนว่าสินค้าไม่พอ
        Swal.fire({
          icon: "error",
          title: "สินค้ามีไม่พอ!",
          text: "สินค้ามีไม่พอในสต็อก!",
        });
        return
      }
      state.cart[index].product_qty += 1;
      state.cart[index].product_totalprice += state.cart[index].product_price;
      state.cart[index].product_stock =  item.product_stock
      if(state.cart[index].sharelinkcode == ''){
        state.cart[index].sharelinkcode = item.sharelinkcode
      }
      state.total = state.cart.reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_main = state.cart.filter(x=>x.product_store !== 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      //state.total_partner = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_pv = state.cart.reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      state.total_main_pv = state.cart.filter(x=>x.product_store !== 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      //state.total_partner_pv = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv));
      //localStorage.setItem("totalPartner", JSON.stringify(state.total_partner));
      //localStorage.setItem("totalPartnerPV", JSON.stringify(state.total_partner_pv));
      localStorage.setItem("totalMain", JSON.stringify(state.total_main));
      localStorage.setItem("totalMainPV", JSON.stringify(state.total_main_pv));
    },
    addquantityPartner(state,item){
      const index = state.cart.findIndex((product) => product.product_id === item._id);  
      if(item.stock < state.cart[index].product_qty+1){
        //ใช้ swal แจ้งเตือนว่าสินค้าไม่พอ
        Swal.fire({
          icon: "error",
          title: "สินค้ามีไม่พอ!",
          text: "สินค้ามีไม่พอในสต็อก!",
        });
        return
      }
      state.cart[index].product_qty += 1;
      state.cart[index].product_totalprice += state.cart[index].product_price;
      state.cart[index].product_stock =  item.stock
      if(state.cart[index].sharelinkcode == ''){
        state.cart[index].sharelinkcode = item.sharelinkcode
      }
      state.total = state.cart.reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_partner = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_pv = state.cart.reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      state.total_partner_pv = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv));
      localStorage.setItem("totalPartner", JSON.stringify(state.total_partner));
      localStorage.setItem("totalPartnerPV", JSON.stringify(state.total_partner_pv));
    },
    minusquantity(state,item){
      const index = state.cart.findIndex((product) => product.product_id === item.product_id);  
      if(state.cart[index].product_qty-1 === 0){
        state.cart.splice(index,1);
      }else{
        state.cart[index].product_qty -= 1;
        state.cart[index].product_totalprice -= state.cart[index].product_price;
        state.cart[index].product_stock =  item.product_stock
        if(state.cart[index].sharelinkcode == ''){
          state.cart[index].sharelinkcode = item.sharelinkcode
        }
      }
      state.total = state.cart.reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_main = state.cart.filter(x=>x.product_store !== 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_pv = state.cart.reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      state.total_main_pv = state.cart.filter(x=>x.product_store !== 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv));
      localStorage.setItem("totalMain", JSON.stringify(state.total_main));
      localStorage.setItem("totalMainPV", JSON.stringify(state.total_main_pv));
    },
    minusquantityPartner(state,item){
      const index = state.cart.findIndex((product) => product.product_id === item._id);  
      if(state.cart[index].product_qty-1 === 0){
        state.cart.splice(index,1);
      }else{
        state.cart[index].product_qty -= 1;
        state.cart[index].product_totalprice -= state.cart[index].product_price;
        state.cart[index].product_stock =  item.stock
        if(state.cart[index].sharelinkcode == ''){
          state.cart[index].sharelinkcode = item.sharelinkcode
        }
      }
      state.total = state.cart.reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_partner = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_pv = state.cart.reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      state.total_partner_pv = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv));
      localStorage.setItem("totalPartner", JSON.stringify(state.total_partner));
      localStorage.setItem("totalPartnerPV", JSON.stringify(state.total_partner_pv));
    },
    clearCart(state){
      state.cart = []
      state.total = 0
      state.total_pv = 0
      localStorage.removeItem("cart"); // เคลียร์ข้อมูลตะกร้าใน localStorage
      localStorage.removeItem("total"); // เคลียร์ข้อมูลราคารวมใน localStorage
      localStorage.removeItem("totalPV"); // เคลียร์ข้อมูลราคารวมใน localStorage
      localStorage.removeItem("totalMainPV");
      localStorage.removeItem("totalPartnerPV");
      localStorage.removeItem("totalMain");
      localStorage.removeItem("totalPartner");
    },

    clearCartMain(state){
      state.cart = state.cart.filter(c => c.product_store === 'partner')
      state.total = state.total - state.total_main
      state.total_pv = state.total_pv - state.total_main_pv
      state.total_main = 0
      state.total_main_pv = 0
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total)); // เคลียร์ข้อมูลราคารวมใน localStorage
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv)); // เคลียร์ข้อมูลราคารวมใน localStorage
      localStorage.removeItem("totalMainPV");
      //localStorage.removeItem("totalPartnerPV");
      localStorage.removeItem("totalMain");
      //localStorage.removeItem("totalPartner");
    },

    clearCartPartner(state, partnerId){
      state.cart = state.cart.filter(c => c.product_partner_id !== partnerId)
      state.total = state.cart.reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_pv = state.cart.reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      state.total_partner = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_partner_pv = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total)); // เคลียร์ข้อมูลราคารวมใน localStorage
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv)); // เคลียร์ข้อมูลราคารวมใน localStorage
      localStorage.setItem("totalPartnerPV", JSON.stringify(state.total_partner_pv));
      //localStorage.removeItem("totalPartnerPV");
      localStorage.setItem("totalPartner", JSON.stringify(state.total_partner));
      //localStorage.removeItem("totalPartner");
    },
    
    deleteProduct(state,item){
      const index = state.cart.findIndex((product) => product.product_id === item.product_id);  
      state.cart.splice(index,1);
      state.total = state.cart.reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_main = state.cart.filter(x=>x.product_store !== 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_pv = state.cart.reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      state.total_main_pv = state.cart.filter(x=>x.product_store !== 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalMain", JSON.stringify(state.total_main));
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv));
      localStorage.setItem("totalMainPV", JSON.stringify(state.total_main_pv));
    },
    deleteProductPartner(state,item){
      const index = state.cart.findIndex((product) => product.product_id === item._id);  
      state.cart.splice(index,1);
      state.total = state.cart.reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_partner = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + product.product_totalprice, 0);
      state.total_pv = state.cart.reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);
      state.total_partner_pv = state.cart.filter(x=>x.product_store === 'partner').reduce((acc, product) => acc + (product.product_pv*product.product_qty), 0);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalPartner", JSON.stringify(state.total_partner));
      localStorage.setItem("totalPV", JSON.stringify(state.total_pv));
      localStorage.setItem("totalPartnerPV", JSON.stringify(state.total_partner_pv));
    },
    setDialog(state,item){
      state.dialog = item
    },

  },
  actions: {},
  modules: {},
});
