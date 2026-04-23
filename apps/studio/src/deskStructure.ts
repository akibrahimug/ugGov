import type { StructureBuilder } from 'sanity/structure';

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('GOV.UG content')
    .items([
      S.listItem()
        .title('Organisations')
        .child(
          S.list()
            .title('Organisations')
            .items([
              S.listItem()
                .title('Ministries')
                .child(
                  S.documentTypeList('organisation')
                    .title('Ministries')
                    .filter('_type == "organisation" && kind == "ministry"'),
                ),
              S.listItem()
                .title('Agencies &amp; authorities')
                .child(
                  S.documentTypeList('organisation')
                    .title('Agencies')
                    .filter(
                      '_type == "organisation" && kind in ["agency","authority","commission","board"]',
                    ),
                ),
              S.listItem()
                .title('Local government')
                .child(
                  S.documentTypeList('organisation')
                    .title('Local government')
                    .filter('_type == "organisation" && kind == "local_government"'),
                ),
              S.listItem()
                .title('Parliament, Judiciary, State House')
                .child(
                  S.documentTypeList('organisation')
                    .title('Constitutional bodies')
                    .filter(
                      '_type == "organisation" && kind in ["parliament","judiciary","state_house"]',
                    ),
                ),
              S.divider(),
              S.listItem()
                .title('All organisations')
                .child(S.documentTypeList('organisation').title('All organisations')),
            ]),
        ),
      S.divider(),
      S.listItem().title('People').child(S.documentTypeList('person').title('People')),
      S.listItem().title('Roles').child(S.documentTypeList('role').title('Roles')),
      S.divider(),
      S.listItem()
        .title('News &amp; announcements')
        .child(S.documentTypeList('news_article').title('News articles')),
      S.listItem()
        .title('Publications')
        .child(S.documentTypeList('publication').title('Publications')),
      S.divider(),
      S.listItem().title('Guides').child(S.documentTypeList('guide').title('Guides')),
      S.listItem().title('Services').child(S.documentTypeList('service').title('Services')),
      S.listItem()
        .title('Programmes')
        .child(S.documentTypeList('programme').title('Programmes')),
      S.divider(),
      S.listItem().title('Locations').child(S.documentTypeList('location').title('Locations')),
      S.listItem().title('Topics').child(S.documentTypeList('topic').title('Topics')),
    ]);
