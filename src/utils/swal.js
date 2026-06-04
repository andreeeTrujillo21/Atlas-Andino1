import Swal from "sweetalert2";

const BASE = Swal.mixin({
  customClass: {
    popup:        "swal-atlas",
    title:        "swal-atlas__title",
    htmlContainer:"swal-atlas__html",
    confirmButton:"swal-atlas__btn swal-atlas__btn--confirm",
    cancelButton: "swal-atlas__btn swal-atlas__btn--cancel",
    icon:         "swal-atlas__icon",
  },
  buttonsStyling: false,
  showClass:  { popup: "swal-atlas-enter" },
  hideClass:  { popup: "swal-atlas-leave" },
});

export const swal = {
  confirm: (opts) => BASE.fire({
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: opts.confirmText ?? "Confirmar",
    cancelButtonText:  "Cancelar",
    reverseButtons: true,
    ...opts,
  }),

  success: (title, text) => BASE.fire({
    icon: "success",
    title,
    text,
    timer: 2200,
    showConfirmButton: false,
  }),

  error: (title, text) => BASE.fire({
    icon: "error",
    title,
    text,
  }),

  toast: (title, icon = "success") => BASE.fire({
    toast: true,
    position: "bottom-end",
    icon,
    title,
    timer: 2500,
    showConfirmButton: false,
    timerProgressBar: true,
  }),
};
