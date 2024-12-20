export default {
    methods: {
        statusIcon(status, size) {
            switch (status) {
              case 'error':
                return `
                  <svg height="${size -2}" viewBox="0 0 20.003 18">
                      <path class="invert-fill-color" d="M11.14,4.494a1,1,0,0,1,1.72,0l7,12.008A1,1,0,0,1,19,18H5a1,1,0,0,1-.86-1.5Zm3.447-1.007a2.994,2.994,0,0,0-5.174,0l-7,12.007A3,3,0,0,0,5,20H19a3,3,0,0,0,2.587-4.506ZM13,9.019a1,1,0,0,0-2,0v2.994a1,1,0,0,0,2,0V9.02ZM12,13.75A1.25,1.25,0,1,0,13.25,15,1.25,1.25,0,0,0,12,13.75Z" transform="translate(-1.998 -2)" fill="#f22121" fill-rule="evenodd"/>
                  </svg>
                `
                case 'success':
                  return `
                    <svg height="${size}" viewBox="0 0 19 19">
                        <path class="invert-fill-color" d="M-1990,9.5a9.5,9.5,0,0,1,9.5-9.5,9.5,9.5,0,0,1,9.5,9.5,9.5,9.5,0,0,1-9.5,9.5A9.5,9.5,0,0,1-1990,9.5Zm1.8,0a7.709,7.709,0,0,0,7.7,7.7,7.709,7.709,0,0,0,7.7-7.7,7.709,7.709,0,0,0-7.7-7.7A7.709,7.709,0,0,0-1988.2,9.5Zm5.515,3.249-2.41-2.608a.849.849,0,0,1,.048-1.2.85.85,0,0,1,1.2.047l1.786,1.933,4.33-4.679a.851.851,0,0,1,1.2-.046.849.849,0,0,1,.046,1.2l-4.954,5.353a.851.851,0,0,1-.624.273A.851.851,0,0,1-1982.685,12.749Z" transform="translate(1990)" fill="#07b923"/>
                    </svg>
                  `
              default:
                break;
            }
        }
    },
}