# Icons

Material icons use geometric shapes to visually represent core ideas, capabilities, or topics.

- Module **@pmwcs/icon**
- Import styles:
  - Using CSS Loader
    - import '@pmwcs/icon/styles';
  - Or include stylesheets
    - **'@pmwcs/icon/icon.css'**
- MDC Docs: [https://material.io/icons](https://material.io/icons)

## Setup

Icons are not part of the official material-components-web spec, but they are referenced many times in the documentation. PMWCS provides a declarative way to use icons. Note that PMWCS does not ship with any icons of its own. Make sure you include an icon set! You can use any one you want, but Google's Material Icons are available through open source. Follow Google's developer guide to get them setup with your app. https://google.github.io/material-design-icons/

There are lots of different strategies for implementing icons on the web, and the Icon component is flexible for most of them. Use ligatures, classNames, inline SVGs, HTML, or URLs to get icons into your app. The default strategy is 'ligature' which works with the material.io font icon set.

Include css for material-icons
```css
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
```

To use material-icons variants
```css
/* outlined */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
/* rounded */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');
/* sharp */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Sharp');
/* twoTone */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone');

```

## Basic Usage

The Icon component, (really the icon prop itself) can accept a variety of formats. Anywhere you see a component prop like `icon` or `trailingIcon` will inherit the same behavior.

```jsx
<Icon icon="favorite" />
```

```jsx
<Icon
  icon={
    <div
      style={{
        background: 'green',
        width: '24px',
        height: '24px',
        borderRadius: '100px'
      }}
    />
  }
/>
```

```jsx
<>
  {/**
    If you have additional options,
    you can pass an object of options to the icon prop.
  */}
  <Icon icon={{ icon: 'star', strategy: 'ligature' }} />

  {/**
    Passing additional props is especially helpful when the entire icon
    component isn't exposed. In this example we pass the additional
    onMouseOver prop directly to the icon
  */}
  <Button
    label="Hello!"
    icon={{
      icon: 'add',
      onMouseOver: () => console.log('OVER')
    }}
  />
</>
```

## Icon Sizing

The Material spec details multiple sizes for icons. The Icon component doesn't assign a size by default, but these are available to you to force a size. Please note, this will only work if you've included the PMWCS icon css file.

To allow consistent sizing `<html>` needs to have a `font-size: 16px;` CSS attribute set.

```jsx
<>
  {/* document.documentElement.style.fontSize = '16px' */}
  {/* 1.125rem -> 18px */}
  <Icon icon={{ icon: 'favorite', size: 'xsmall' }} />
  {/* 1.25rem -> 20px */}
  <Icon icon={{ icon: 'favorite', size: 'small' }} />
  {/* 1.5rem -> 24px */}
  <Icon icon={{ icon: 'favorite', size: 'medium' }} />
  {/* 2.25rem -> 36px */}
  <Icon icon={{ icon: 'favorite', size: 'large' }} />
  {/* 3rem -> 48px */}
  <Icon icon={{ icon: 'favorite', size: 'xlarge' }} />
</>
```

## Ligatures

This is for icon fonts that support ligatures like material-icons. This is the default strategy if nothing is set and doesn't require any additional setup if you are using material-icons.

```jsx
<>
  <Icon icon="favorite" />
  <Icon icon="favorite_outline" />
  {/* Example showing how to set the strategy explicitly */}
  <Icon icon={{ icon: 'star', strategy: 'ligature' }} />
</>
```

## URLs

This is for icons that are accessible via HTTP(S) and will be loaded directly into an `img` tag. This can be auto-detected for things that look like urls. The image will be set as a backgroundImage of the icon. Make sure you impor the PMWCS icon css file for this to work properly.

```jsx
<>
  {/** Auto detection */}
  <Icon icon="images/icons/twitter.png" />
  {/** Explicit */}
  <Icon
    icon={{
      icon: 'images/icons/twitter.png',
      strategy: 'url'
    }}
  />
</>
```

## Components / Inline SVGs

This will render a child component inside of the icon. This is useful for all sorts of customization and for rendering inline SVGs. The following example shows rendering an SVG, as well as an arbitrary `div`.

```jsx
<>
  {/** Auto detection */}
  <Icon
    icon={
      <div
        style={{
          background: 'green',
          width: '24px',
          height: '24px',
          borderRadius: '100px'
        }}
      />
    }
  />
  {/** Explicit */}
  <Icon
    icon={{
      strategy: 'component',
      icon: (
        <svg
          style={{ width: '24px', height: '24px' }}
          viewBox="0 0 24 24"
        >
          <path
            fill="#4285F4"
            d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
          />
        </svg>
      )
    }}
  />
</>
```

## Classnames

Some font icon sets like Ion Icons and Glyph Icons render based on a className that is set. PMWCS docs doesn't include extra icon fonts so there is no example to render, but the below code should give you an approximation.

**THIS CANNOT BE AUTO DETECTED**. You'll have to explicitly set the strategy directly on the Icon or specify it globally via the PMWCSProvider.

```jsx
<>
  {/* Ion Icons <i class="icon ion-star"></i> */}
  <Icon
    icon={{
      icon: 'star',
      strategy: 'className',
      basename: 'icon',
      prefix: 'ion-'
    }}
  />
  {/**
   * Set the option globally throug PMWCSProvider
   * Glyphicons <span class="glyphicons glyphicons-heart"></span>
   **/}
  <PMWCSProvider
    icon={{
      strategy: 'className',
      basename: 'glyphicons',
      prefix: 'glyphicons-'
    }}
  >
    <Icon icon="heart" />
  </PMWCSProvider>
</>
```

## Custom Rendering

Sometimes, you just need to do your own thing. Maybe you have a legacy project that already has icons and you want to incorporate them with PMWCS. If none of the other strategies are what you need, then you can hijack the whole thing and delegate it to your own render function.

```jsx
<Icon
  icon={{
    icon: 'favorite',
    strategy: 'custom',
    render: ({ content }) => <div>Hello + {content}</div>
  }}
/>
```

A more relevant example involves an app that has a custom / existing icon component. There are a litany of reasons why your app might need one, but if you've found this section of the docs you likely know what problem you need to solve.

```jsx

  `
  // 1) Your app has an icon component you use
  import { MyIconComponent } from '@pmwcs/icon';
  <MyIconComponent name="search" />

  // 2) Now you are using PMWCS, lots of components are instances of Icons
  // You need to be able to delegate the handling of an icon prop to your own component
  import { TextField } from '@pmwcs/textField';
  import { Chip } from '@pmwcs/chip';
  <TextField icon="favorite" />
  <Chip icon="favorite" />

  // 3) Instead, you should set the custom strategy to be your default
  // and add your own handling with PMWCSProvider
  import { h } from 'preact'
  import * as ReactDOM from 'react-dom';
  import App from './App'; // your main app component
  import { PMWCSProvider } from '@pmwcs/provider';
  import { MyIconComponent } from '@pmwcs/icon';

  const iconRenderHandler = ({ content, className, ...rest }) => {
    // content is whatever was passed to the icon prop

    // className is the fully processed className taking into account the basename and prefix defaults
    // it's important to include this because MDC often has classes like text-field-icon directly
    // on the component for alignment

    // rest is just any other props
    return <MyIconComponent className={className} name={content} {...rest} />
  };

  ReactDOM.render(
    <PMWCSProvider icon={{strategy: 'custom', render: iconRenderHandler}}>
      <App />
    </PMWCSProvider>,
    document.getElementById('root')
  );

  // 4) Now anywhere in your app that an Icon instance is used, it will be
  // delegated to your handler and render your custom component
  import { TextFieldIcon } from '@pmwcs/textfield';
  <TextFieldIcon icon="search" />
`

```

## Icon
An Icon component. Most of these options can be set once globally, read the documentation on Provider for more info.

### Props

| Name | Type | Description |
|------|------|-------------|
| `icon` | `AnyComponent` | The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. |
| `strategy` | `ligature \| className \| url \| component \| custom` | Handle multiple methods of embedding an icon. 'ligature' uses ligature style embedding like material-icons, 'className' adds a class onto the element for libraries like glyphicons and ion icons, 'url' will load a remote image, and 'component' will render content as children like SVGs or any other React node. 'custom' allows you to specify your own render prop. If not set, 'auto' will be used or the defaults set inside of PMWCSProvider. |
| `prefix` | `string` | A className prefix to use when using css font icons that use prefixes, i.e. font-awesome-, ion-, glyphicons-. This only applies when using the 'className' strategy. |
| `basename` | `string` | A base className for the icon namespace, i.e. material-icons. |
| `render` | `function ({ content, className }) {}` | A render function to use when using the 'custom' strategy. |
| `size` | `"xsmall" \| "small" \| "medium" \| "large" \| "xlarge"` | A size to render the icon |
| `children` | `AnyComponent` | icon name for strategy ligature and component |
| `outlined` | `boolean` | material icon variant outlined; basename needs to be set to material-icons |
| `rounded` | `boolean` | material icon variant rounded; basename needs to be set to material-icons |
| `twoTone` | `boolean` | material icon variant two-tone; basename needs to be set to material-icons |
| `sharp` | `boolean` | material icon variant sharp; basename needs to be set to material-icons |
