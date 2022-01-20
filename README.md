Nx is nice!



```

npx create-nx-workspace@13.4.6 mymonorepo --preset=react --appName=testapp --style=@emotion/styled --nx-cloud=false --packageManager=npm

cd mymonorepo

nx g @rnwl/react:lib testlib

nx g @nrwl/react:storybook-configuration testlib --configureCypress --generateStories --generateCypressSpecs

nx run testlib:storybook


# bash
NODE_ENV=production && nx run testlib:build-storybook

# powershell
($env:NODE_ENV="production") -and (nx run react-map-leaflet:build-storybook)

```


