import {Navigation} from 'react-native-navigation';

import {ApplicationBootstrapView} from 'features/bootstrap/views/ApplicationBootstrapView';

import {TopMoviesListView} from 'features/movie/views/TopMoviesListView';
import {SelectedMovieDetailsView} from 'features/movie/views/SelectedMovieDetailsView';

import {NoteEditView} from 'components/native/MovieNoteEditView';

import {ROUTES} from 'navigation/routes';

Navigation.registerComponent(
    ROUTES.BOOTSTRAP.FEATURE_BOOTSTRAP,
    () => ApplicationBootstrapView,
);

Navigation.registerComponent(
    ROUTES.MOVIE.FEATURE_MOVIE_LIST,
    () => TopMoviesListView,
);
Navigation.registerComponent(
    ROUTES.MOVIE.FEATURE_MOVIE_DETAILS,
    () => SelectedMovieDetailsView,
);
Navigation.registerComponent(
    ROUTES.MOVIE.FEATURE_EDIT_NOTE,
    () => NoteEditView,
);

Navigation.events().registerAppLaunchedListener(async () => {
    await Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: ROUTES.BOOTSTRAP.FEATURE_BOOTSTRAP,
                            options: {
                                topBar: {
                                    visible: false,
                                },
                            },
                        },
                    },
                ],
            },
        },
    });
});
