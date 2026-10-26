<script>
  export let menuItems = [];
  let isMenuOpen = false;
  function toggleMenu() { isMenuOpen = !isMenuOpen; }
</script>

<header class="main-header">
  <div class="main-header__inner">
    <div class="main-header__logo">
      <a href="/">
        <img src="/sabuykapao-logo.svg" alt="SabuyKapao - กลับไปหน้าแรก" width="40" height="40" />
        <span>SABUYKAPAO</span>
      </a>
    </div>

    <nav class="main-header__nav-desktop">
      {#each menuItems as item}
        <a href={item.url}>{item.title}</a>
      {/each}
    </nav>

    <div class="main-header__actions">
      <button id="search-trigger-btn" class="search-icon-btn" aria-label="เปิดค้นหา">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>

      <button
        class="main-header__hamburger"
        class:is-active={isMenuOpen}
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</header>

{#if isMenuOpen}
  <nav class="main-header__nav-mobile">
    {#each menuItems as item}
      <a href={item.url} on:click={() => isMenuOpen = false}>{item.title}</a>
    {/each}
  </nav>
{/if}

<style lang="scss">
  @use 'sass:color';
  @use '../styles/variables' as var;

  .main-header {
    /* แก้ไข: ส่วน header หลักจะคุมแค่พื้นหลังและเส้นขอบ */
    padding: 0.5rem 0;
    background-color: var.$clr-bg-secondary;
    border-bottom: 1px solid color.scale(var.$clr-bg-secondary, $lightness: -5%);
    position: relative;
    z-index: 100;

    /* เพิ่ม: .main-header__inner สำหรับคุมเนื้อหา */
    &__inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px; /* ทำให้กว้างเท่า content */
      margin: 0 auto; /* จัดกลาง */
      padding: 0 1.5rem; /* ระยะห่างซ้ายขวา */
    }

    &__logo {
      a {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      img {
        height: 40px;
        width: auto;
        display: block;
      }
      span {
        font-family: var.$font-heading;
        font-weight: 700;
        font-size: 1.5rem;
        color: var.$clr-text-heading;
      }
    }

    &__nav-desktop {
      display: none;
      @media (min-width: 768px) {
        display: flex;
        gap: 2.5rem;
      }
      a {
        font-family: var.$font-heading;
        font-size: 1.25rem;
        position: relative;
        color: var.$clr-text-heading;
        &:hover {
          color: var.$clr-accent;
        }
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .search-icon-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var.$clr-text-heading;
      transition: color 0.2s ease;

      &:hover {
        color: var.$clr-accent;
      }

      svg {
        width: 20px;
        height: 20px;
      }

      @media (max-width: 767px) {
        padding: 0.25rem;
      }
    }

    &__hamburger {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 2rem;
      height: 2rem;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 20;

      @media (min-width: 768px) {
        display: none;
      }

      span {
        display: block;
        width: 2rem;
        height: 3px;
        background: var.$clr-text-heading;
        border-radius: 10px;
        transition: all 0.3s ease-in-out;
      }

      &.is-active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      &.is-active span:nth-child(2) {
        opacity: 0;
      }
      &.is-active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
      }
    }

    &__nav-mobile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      background-color: var.$clr-bg-secondary;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 10;

      a {
        font-family: var.$font-heading;
        font-size: 2rem;
        color: var.$clr-text-heading;
      }
    }
  }
</style>