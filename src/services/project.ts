export async function criarProjeto(data: any) {
  const response = await fetch('http://localhost:8081/api/v1/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log('Response Status:', response.status);
  return response.json();
} 