# The `src/sass` Directory

This folder is actually fairly self-explanatory: it contains SASS files to be compiled during the build. The preferred syntax is `scss`. Although `.sass` and `.css` files from 3rd party components can be imported. 

The only important thing to note is that files which filename starts with an `_` are partials and will **NOT** be processed during the build, meaning that they must be *imported* into another file.

Modules which require specific styling should create a file `[module_name].scss` and put inside the `modules` folder. A module style can be split into many files, in which case a folder with the module name should be created and to hold **partial** files for the module. Only **one** top file per module is allowed. For an example, look at the `person` module. The current structure of the the module is as follows:

```
src/app/styles
   |- modules
      |  |- person
      |     |- _form.scss 
      |     |- _list.scss
      |     |- _profile.scss
      |- person.scss
```

All the partials inside the person folder are imported into person. The `person.scss` will be compiled into a `person.css` file with all the module style.

CSS or SASS files from external components also need to be imported. If, for example, we had a Twitter feed component with
an accompanying template and style, we would similarly import it:

```css
@import '../common/twitterFeed/twitterFeedDirective.less';
```

Using this decentralized approach for all common code (JavaScript, HTML, and CSS) creates a framework where a component's directory can be dragged and dropped into *any other project* and it will "just work".

I would like to eventually automate the importing during the build so that manually importing it here would no longer be required, but more thought must be put in to whether this is the best approach.
