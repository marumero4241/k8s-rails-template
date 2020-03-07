<template>
  <v-card height="90vh">
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-navigation-drawer
            absolute
            permanent
            left
          >

            <v-list dense>
              <v-list-item
                v-for="item in items"
                :key="item.title"
                @click=""
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-col cols="9">
          <v-list two-line>
            <v-list-item-group
              v-model="selected"
              multiple
              active-class="pink--text"
            >
              <template v-for="(item, index) in books">
                <v-list-item :key="item.title">
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-avatar tile>
                      <v-img :src="item.image"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.author"></v-list-item-subtitle>
                    </v-list-item-content>
      
                    <v-list-item-action>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        star_border
                      </v-icon>
      
                      <v-icon
                        v-else
                        color="yellow"
                      >
                        star
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>
      
                <v-divider
                  v-if="index + 1 < items.length"
                  :inset="true"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-bottom-navigation
      scroll-target="#scroll-area-1"
      absolute
      horizontal
      grow
      >
      <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
      ></v-pagination>
    </v-bottom-navigation>
  </v-card>
</template>