const template = document.createElement('template');
template.innerHTML = `
  <style>
    select:-webkit-autofill:focus {
      border: 1px solid green;
      -webkit-text-fill-color: green;
      -webkit-box-shadow: 0 0 0px 1000px #000 inset;
      transition: background-color 5000s ease-in-out 0s;
    }
    ::placeholder {
      color: #fff;
      opacity: 1; /* Firefox */
    }
  
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #fff;
    }
    
    ::-ms-input-placeholder { /* Microsoft Edge */
    color: #fff;
    }
    .root {
      width: 100%;
      height: 40px;
      display: flex;
    }
    .input-container {
      display: flex;
      width: 100%;
      position: relative;
    }
    .icon {
      width: 40px;
      height: 40px;
      position: absolute;
      left: 10px;
    }
    .search-input {
      width: 100%;
      border: none;
      padding: 10px;
      background-color: rgba(255, 255, 255, .3);
      color: #fff;
      padding-left: 60px;
    }
    .search-input::before {
      content: '';
      position: absolute;
      width: 35px;
      height: 35px;
      background: url(../movie.svg) no-repeat top left;
      background-size: contain;
    }
    .search-input:focus {
      background-color: #fff;
      color: #000;
    }
    .search-input:focus+.btn {
      visibility: hidden
    }
    .btn {
      background-color: #fff;
      border: none;
      margin-left: 5px;
      position: absolute;
      right: 0
    }
  </style>
  <div class='root'>
    <div class="input-container">
      <div class='icon'>
        <svg viewBox="0 0 512 512" fill="#fff"><path d="M352 255.5l-192 96v-192l192 96zm160-224v448H0v-448h512zm-192 64h64v-32h-64v32zm-96 0h64v-32h-64v32zm-96 0h64v-32h-64v32zm-96 0h64v-32H32v32zm64 320H32v32h64v-32zm96 0h-64v32h64v-32zm96 0h-64v32h64v-32zm96 0h-64v32h64v-32zm96 0h-64v32h64v-32zm0-288H32v256h448v-256zm0-64h-64v32h64v-32z"/></svg>
      </div>
      <input type="text" id="searchResult" name="searchResult" class="search-input" placeholder='Enter movie name'
      minlength="3" maxlength="8" autocomplete='on'/>
      <button type="submit" class="btn">
        <svg width="40" height="35" viewBox="0 0 92 92"><path d="M20.8 39.27c0-11.016 8.808-19.976 19.637-19.976 10.827 0 19.635 8.96 19.635 19.972 0 11.014-8.808 19.976-19.635 19.976-10.83 0-19.64-8.96-19.64-19.976zm55.472 32.037l-15.976-16.25a25.809 25.809 0 005.376-15.788c0-14.16-11.32-25.67-25.232-25.67-13.923 0-25.24 11.51-25.24 25.67s11.32 25.67 25.237 25.67c4.776 0 9.227-1.388 13.04-3.74L69.84 77.85a4.506 4.506 0 006.432 0c1.77-1.8 1.77-4.744 0-6.544z" fill="#f87204"/></svg>
      </button>
    </div>
  </div>
`;

class AutocompleteSearch extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
  }

  connectedCallback(){
    this.shadowRoot.querySelector('#searchResult').addEventListener('change', (e) => console.log(e.target.value));
  }

  // disconnectedCallback() {
  //   this.shadowRoot.querySelector('#searchResult').removeEventListener();
  // }
}

window.customElements.define('autocomplete-search', AutocompleteSearch)