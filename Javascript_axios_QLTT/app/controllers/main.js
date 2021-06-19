var service = new UserServices();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function getData() {
  service
    .getListUserApi()
    .then(function (result) {
      // console.log(result.data);
      renderListUser(result.data);
      service.list = result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getData();


function renderListUser(list) {
  contentHTML = [];
  list.forEach(function (user, index) {
    contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <img src="../../assets/img/${user.hinhAnh}" width="50">
            </td>
            <td>${user.moTa}</td>
            <td class="d-flex">
              <button class="btn btn-success mr-1 " onclick="suaNguoiDung(${
                user.id
              })" data-toggle="modal" data-target="#myModal">Sửa</button>
              <button class="btn btn-warning" onclick="xoaNguoiDung(${
                user.id
              })">Xóa</button>
            </td>
        </tr>        
        `;
  });
  document.getElementById("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    " Thêm Người Dùng";
  var footer =
    '<button class="btn btn-primary " onclick= "addUser()"  >Thêm người Dùng</button>';
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function layDuLieuDauVao(isAdd) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;
  var hinhAnh = getEle("HinhAnh").value;

  var isValid = true;

  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "errtaikhoan",
      "(*) Tài khoản không được trống"
    ) &&
    validation.kiemTraTaiKhoanTrung(
      taiKhoan,
      "errtaikhoan",
      "(*) Tài khoản không được trùng",
      service.list
    );

  isValid &=
    validation.kiemTraRong(
      hoTen,
      "errhoten",
      "(*) Họ tên không được trống"
    ) &&
    validation.kiemTraKiTuChuoi(hoTen, "errhoten", "(*) Họ tên phải là chữ");

  isValid &=
    validation.kiemTraRong(
      matKhau,
      "errmatkhau",
      "(*) Mật khẩu không được trống"
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "errmatkhau",
      "(*) Mật khẩu phải có chữ in hoa, chữ thường, số và kí tự đặc biệt"
    ) &&
    validation.kiemTraDoDaiKiTu(
      matKhau,
      "errmatkhau",
      "(*) Mật khẩu từ 6 - 8 kí tự",
      6,
      8
    );

  isValid &=
    validation.kiemTraRong(
      email,
      "erremail",
      "(*) Email không được trống"
    ) && validation.kiemTraEmail(email, "erremail", "(*) Email không đúng");

  isValid &= validation.kiemTraRong(
    hinhAnh,
    "erremail",
    "(*) Hình ảnh không được trống"
  );

  isValid &= validation.kiemTraChon(
    "loaiNguoiDung",
    "errloainguoidung",
    "(*) Vui lòng chọn người dùng"
  );

  isValid &= validation.kiemTraChon(
    "loaiNgonNgu",
    "errngonngu",
    "(*) Vui lòng chọn ngôn ngữ"
  );

  isValid &=
    validation.kiemTraRong(moTa, "errmota", "(*) Mô tả không được trống") &&
    validation.kiemTraDoDaiKiTu(
      moTa,
      "errmota",
      "(*) Mô tả không vượt quá 60 kí tự",
      1,
      60
    );

  if (isValid) {
    var user = new User(
      id,
      taiKhoan,
      hoTen,
      matKhau,
      email,
      hinhAnh,
      loaiND,
      ngonNgu,
      moTa,
      
    );
    return user;
  }
  return null;
}

function addUser() {
  var user = layDuLieuDauVao(true);

  if (user) {
    service
      .addUserApi(user)
      .then(function (result) {
        console.log(result);
        // getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function xoaNguoiDung(id) {
  service
    .deleteUserApi(id)
    .then(function () {
      getData();
      alert("delete completed");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function suaNguoiDung(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa người dùng";
  var footer = `<button class="btn btn-success" onclick="capNhatND(${id})">Cập Nhập</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  service
    .getUserByIdApi(id)
    .then(function (result) {
      console.log(result.data);
      //show ra cac the
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(erroe);
    });
}

function capNhatND(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var user = new User(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiND,
    ngonNgu,
    moTa
  );
  service
    .updateUserApi(user)
    .then(function (result) {
      alert("cap nhat thanh cong");
      document.getElementsByClassName("close")[0].click();
      getData();
    })
    .catch(function (error) {
      console.log(error);
    });
}
