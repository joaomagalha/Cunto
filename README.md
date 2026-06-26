# José Cunto Neto — Portfólio

Site de portfólio de fotografia artística e documental de **José Cunto Neto**, fotógrafo de Cuiabá, Mato Grosso.

## Sobre o projeto

Exposição virtual do acervo fotográfico de José Cunto Neto. O design segue uma estética editorial minimalista — fundo neutro, tipografia Inter, paleta restrita a preto, branco e tons de cinza — para que as fotografias em preto e branco sejam o centro da experiência.

## Tecnologias

- HTML5 semântico
- CSS3 (custom properties, clamp(), grid, flexbox)
- JavaScript vanilla (ES6+)
- [GSAP 3](https://gsap.com/) — animações e ScrollTrigger
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll

## Estrutura

```
Cunto/
├── index.html
├── style.css
├── script.js
└── Assets/
    └── Imagens/
        ├── Sem Cor/   # Acervo fotográfico (WebP)
        ├── Cunto/     # Foto do fotógrafo
        └── Logo/      # Logotipo
```

## Rodar localmente

Basta abrir o `index.html` em um servidor local. Com o VS Code, use a extensão **Live Server**. Via terminal:

```bash
npx serve .
```

## Deploy

O site é estático — pode ser publicado em qualquer CDN ou hosting de arquivos estáticos (Netlify, Vercel, GitHub Pages, etc.).

> **Antes do deploy:** substitua `https://seudominio.com.br` nas tags Open Graph do `index.html` pelo domínio real do site.

## Créditos

- Fotografia: José Cunto Neto
- Desenvolvimento: [João Victor](https://github.com/joaomagalha)
