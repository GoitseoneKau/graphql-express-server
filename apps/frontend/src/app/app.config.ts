import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';

export const cache =  new InMemoryCache({
        typePolicies:{
          Query:{
            fields:{
              todos:{
                merge(existing,incoming){
                  return incoming
                }
              }
            }
          }
        }
      }); 

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), 
    provideApollo( () => {
      const httpLink = inject(HttpLink);
    
      return {
        link: httpLink.create({
          uri: 'http://localhost:3000/graphql',
        }),
        cache,
        defaultOptions:{
           watchQuery: {
                fetchPolicy: 'cache-and-network',
                errorPolicy: 'ignore',
            },
            query: {
                 fetchPolicy: 'cache-first',
                errorPolicy: 'all',
            },
            mutate: {
                errorPolicy: 'all'
            }
        }
      };
    })]
};
