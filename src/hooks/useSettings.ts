import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getSettings, setSettings} from '../services/settings';

const SETTINGS_QUERY_KEY = 'settings-query';
export function useSettingsQuery() {
  return useQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: getSettings,
  });
}

const SETTINGS_MUTATION_KEY = 'settings-mutation';
export function useSettingsMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationKey: [SETTINGS_MUTATION_KEY],
    mutationFn: setSettings,
    onSuccess() {
      client.invalidateQueries({queryKey: [SETTINGS_QUERY_KEY]});
    },
  });
}
