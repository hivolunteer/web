import config from "../config"

export default async function getTheme(token: string, theme_id: number): Promise<string> {
  const response = await fetch(`${config.apiUrl}/themes/${theme_id?.toString()}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if (response.status === 200) {
    const body = await response.json();
    return body.name;
  }
  return "";
}