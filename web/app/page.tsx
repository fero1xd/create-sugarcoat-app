import { Section, Container, Main, Article } from '@/components/craft';
import Balancer from 'react-wrap-balancer';

import CopyButton from '@/components/copy-button';
import Link from 'next/link';

export default function Home() {
  return (
    <Main className='min-h-screen'>
      <Section className='!pb-0 !pt-40'>
        <Container className='text-center'>
          <div className='relative group overflow-visible mb-5 lg:mb-0 md:mb-0'>
            <Balancer>
              <h1 className='z-[5] relative !mb-0 !font-extrabold leading-tight sm:leading-tight lg:leading-relaxed text-transparent bg-clip-text  from-blue-500 via-teal-500 to-pink-500 bg-gradient-to-r'>
                create-sugarcoat-app
              </h1>
              <h1 className='blur-xl absolute inset-0 mb-0 !font-bold leading-tight sm:leading-tight lg:leading-relaxed text-transparent bg-clip-text  from-blue-500 via-teal-500 to-pink-500   bg-gradient-to-r'>
                create-sugarcoat-app
              </h1>
            </Balancer>
          </div>

          <Article className='text-muted-foreground'>
            <Balancer>
              A command-line tool designed to swiftly scaffold a modern backend
              API using TypeScript. Drizzle, Prisma, Typeorm, Turso, Hono, Lucia
              etc...
            </Balancer>
          </Article>

          <div className='max-w-xl mx-auto w-full relative text-left'>
            <pre
              className='shiki vitesse-dark flex items-center justify-between'
              style={{ backgroundColor: '#121212', color: '#dbd7caee' }}
              tabIndex={0}
            >
              <code>
                <span className='line'>
                  <span style={{ color: '#80A665' }}>npx</span>
                  <span style={{ color: '#C98A7D' }}> create-</span>
                  <span style={{ color: '#C98A7D' }}>sugarcoat-app@latest</span>
                </span>
              </code>
              <CopyButton />
            </pre>
          </div>
        </Container>
      </Section>

      <Section className='text-center'>
        <h3>Available Technologies</h3>

        <Article className='text-muted-foreground'>
          <Balancer>
            Quickly get started with combination of any of these technologies
            below. Many more to come...
          </Balancer>
        </Article>

        <div className='max-w-sm lg:max-w-7xl w-full mx-auto logos group relative overflow-hidden whitespace-nowrap py-10 [mask-image:_linear-gradient(to_right,_transparent_0,_white_128px,white_calc(100%-128px),_transparent_100%)]'>
          {[1, 2, 3].map((i) => (
            <div
              className='animate-slide-left group-hover:animation-pause inline-block w-max'
              key={i}
            >
              <Link href='https://orm.drizzle.team' target='_blank'>
                <svg
                  role='img'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  className='mx-6 inline h-16'
                  fill='white'
                >
                  <title>Drizzle</title>
                  <path d='M5.353 11.823a1.036 1.036 0 0 0-.395-1.422 1.063 1.063 0 0 0-1.437.399L.138 16.702a1.035 1.035 0 0 0 .395 1.422 1.063 1.063 0 0 0 1.437-.398l3.383-5.903Zm11.216 0a1.036 1.036 0 0 0-.394-1.422 1.064 1.064 0 0 0-1.438.399l-3.382 5.902a1.036 1.036 0 0 0 .394 1.422c.506.283 1.15.104 1.438-.398l3.382-5.903Zm7.293-4.525a1.036 1.036 0 0 0-.395-1.422 1.062 1.062 0 0 0-1.437.399l-3.383 5.902a1.036 1.036 0 0 0 .395 1.422 1.063 1.063 0 0 0 1.437-.399l3.383-5.902Zm-11.219 0a1.035 1.035 0 0 0-.394-1.422 1.064 1.064 0 0 0-1.438.398l-3.382 5.903a1.036 1.036 0 0 0 .394 1.422c.506.282 1.15.104 1.438-.399l3.382-5.902Z' />
                </svg>
              </Link>

              <Link href='https://expressjs.com' target='_blank'>
                <svg
                  role='img'
                  viewBox='0 0 24 24'
                  className='mx-6 inline h-16'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='white'
                >
                  <title>Express</title>
                  <path d='M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z' />
                </svg>
              </Link>

              <Link href='https://hono.dev' target='_blank'>
                <svg
                  role='img'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  className='mx-6 inline h-12'
                  fill='#fff'
                >
                  <title>Hono</title>
                  <path d='M12.445.002a45.529 45.529 0 0 0-5.252 8.146 8.595 8.595 0 0 1-.555-.53 27.796 27.796 0 0 0-1.205-1.542 8.762 8.762 0 0 0-1.251 2.12 20.743 20.743 0 0 0-1.448 5.88 8.867 8.867 0 0 0 .338 3.468c1.312 3.48 3.794 5.593 7.445 6.337 3.055.438 5.755-.333 8.097-2.312 2.677-2.59 3.359-5.634 2.047-9.132a33.287 33.287 0 0 0-2.988-5.59A91.34 91.34 0 0 0 12.615.053a.216.216 0 0 0-.17-.051Zm-.336 3.906a50.93 50.93 0 0 1 4.794 6.552c.448.767.817 1.57 1.108 2.41.606 2.386-.044 4.354-1.951 5.904-1.845 1.298-3.87 1.683-6.072 1.156-2.376-.737-3.75-2.335-4.121-4.794a5.107 5.107 0 0 1 .242-2.266c.358-.908.79-1.774 1.3-2.601l1.446-2.121a397.33 397.33 0 0 0 3.254-4.24Z' />
                </svg>
              </Link>

              <Link href='https://www.prisma.io' target='_blank'>
                <svg
                  className='mx-6 inline h-14'
                  fill='#fff'
                  role='img'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Prisma</title>
                  <path d='M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z' />
                </svg>
              </Link>

              <Link href='https://turso.tech' target='_blank'>
                <svg
                  className='mx-6 inline h-14'
                  fill='#fff'
                  role='img'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Turso</title>
                  <path d='m23.31.803-.563-.42-1.11 1.189-.891-1.286-.512.235.704 1.798-.326.35L18.082 0l-.574.284 2.25 4.836-2.108.741h-.05l-1.143-1.359-1.144 1.36H8.687l-1.144-1.36-1.146 1.363H6.36l-2.12-.745L6.491.284 5.919 0l-2.53 2.668-.327-.349.705-1.798-.512-.236-.89 1.287L1.253.382.69.804 2.42 3.69l-.89.939.311 2.375 2.061.787L3.9 8.817H1.947v.444l.755 1.078 1.197.433v6.971l3.057 4.55L7.657 24l1.101-1.606L9.9 24l.999-1.606L12 24l1.102-1.606L14.1 24l1.141-1.606L16.343 24l.701-1.706 3.058-4.55v-6.972l1.196-.433.756-1.078v-.444h-1.952l.003-1.03 2.054-.784.311-2.375-.89-.939zm-8.93 18.718H8.033l.793-1.615.794 1.615.793-1.083.793 1.083.794-1.083.793 1.083.794-1.083.793 1.083.793-1.615.794 1.615zm3.886-7.39-3.3 1.084-.143 3.061-2.827.627-2.826-.627-.142-3.06-3.3-1.085v-1.635l4.266 1.21-.052 4.126h4.109l-.052-4.127 4.266-1.209z' />
                </svg>
              </Link>

              <Link href='https://typeorm.io' target='_blank'>
                <svg
                  fill='#fff'
                  className='mx-6 inline h-14'
                  role='img'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>TypeORM</title>
                  <path d='M22.593 6.863c0 .9-.008 1.742.004 2.583.006.355.07.708.21 1.038.133.306.35.544.652.692.153.075.314.131.47.204a.134.13 0 0 1 .066.099q.008.58 0 1.16c0 .039-.052.097-.093.11a1.818 1.82 0 0 0-1.178 1.22c-.125.387-.137.785-.137 1.187q.002 2.24-.006 4.48c0 .466-.07.926-.225 1.363-.087.241-.226.463-.347.69-.016.031-.05.052-.08.073-.185.137-.365.287-.56.407-.169.103-.354.177-.535.255-.114.048-.236.082-.352.121q-.025.01-.05.014c-.23.028-.46.062-.689.083q-.418.033-.834.052c-.061.003-.123-.02-.183-.026-.104-.01-.13-.07-.128-.168a31.962 32 0 0 0 0-1.017c0-.104.027-.15.139-.141.117.007.24.012.354-.004q.332-.047.655-.125a2.996 3 0 0 0 .44-.153.94.94 0 0 0 .456-.409c.125-.208.185-.437.236-.676.057-.263.036-.52.04-.78.007-1.485 0-2.97.008-4.456q.003-.47.078-.935a2.148 2.15 0 0 1 1.09-1.585l.25-.143c.061-.037.054-.107-.016-.144a2.797 2.8 0 0 1-.815-.646 2.097 2.1 0 0 1-.39-.711c-.18-.551-.205-1.12-.202-1.694.002-1.446-.01-2.892 0-4.337a2.996 3 0 0 0-.072-.666c-.08-.37-.24-.712-.59-.909a2.298 2.3 0 0 0-.467-.177 2.996 3 0 0 0-.503-.11 3.995 4 0 0 0-.54-.025c-.113.001-.153-.03-.15-.147.006-.364.003-.728.001-1.092 0-.089.03-.122.117-.119.196.005.39-.007.584.004.272.016.545.035.815.073a3.096 3.1 0 0 1 1.598.714c.252.215.408.479.534.772.15.346.226.71.275 1.082.13.99.03 1.986.072 2.918ZM1.421 6.715c0-.581-.006-1.163.002-1.745.006-.382.009-.77.049-1.149.027-.263.11-.52.18-.778a1.798 1.8 0 0 1 .366-.723 2.466 2.4 0 0 1 .508-.449c.194-.127.416-.208.629-.305.17-.076.348-.108.53-.141A8.29 8.3 0 0 1 5.258 1.3c.09 0 .122.027.12.117q-.004.558 0 1.118c0 .091-.028.126-.123.122a1.598 1.6 0 0 0-.321.003 7.99 8 0 0 0-.704.127c-.15.035-.291.094-.434.148a.94.94 0 0 0-.46.406c-.123.208-.183.44-.238.68-.067.3.008.588.002.882-.02 1.329-.006 2.658-.01 3.99a9.988 10 0 0 1-.051 1.098c-.08.724-.385 1.328-1.024 1.727q-.173.103-.345.209c-.023.014-.051.049-.047.068a.14.14 0 0 0 .058.084 2.897 2.9 0 0 1 .843.678c.19.23.311.494.4.78.15.496.159 1.006.164 1.516.008 1.298.002 2.597.003 3.896 0 .144.015.288.013.431 0 .072-.025.143-.027.215q-.004.126.005.253c.003.052.02.104.029.156.043.301.137.583.336.817.131.153.303.252.494.321.201.072.41.1.616.149.246.058.485.044.73.054.065.003.09.03.09.093 0 .392.002.784-.005 1.176 0 .029-.053.081-.082.081-.252.005-.503.01-.754-.002a4.994 5 0 0 1-.678-.069c-.234-.044-.46-.122-.69-.186a2.148 2.15 0 0 1-.955-.572 1.898 1.9 0 0 1-.376-.54 4.195 4.2 0 0 1-.292-.87 4.994 5 0 0 1-.103-.964c-.015-1.423-.013-2.846-.023-4.268-.002-.322-.004-.645-.039-.964-.04-.36-.12-.712-.342-1.013a1.498 1.5 0 0 0-.624-.487c-.11-.048-.226-.083-.334-.137-.037-.02-.077-.075-.077-.115q-.006-.56-.003-1.118c0-.1.088-.118.155-.141.372-.13.676-.348.891-.684a2.048 2.05 0 0 0 .344-1.087c.022-.92.03-1.841.044-2.76h-.016Zm6.035.98v-3.11c0-.295.175-.472.472-.472h5.152c.296 0 .473.177.473.472v6.2c0 .32-.17.49-.488.49-1.708 0-3.412-.002-5.12.004-.287 0-.494-.197-.49-.493.006-1.03.002-2.06.002-3.091m.245.002v3.091c0 .208.035.242.24.242h5.119c.214 0 .246-.03.246-.244V4.603c0-.213-.033-.245-.244-.245H7.945c-.21 0-.242.033-.242.247zm-.245 8.39v-3.1c0-.298.173-.474.471-.474h5.152c.3 0 .473.177.473.48v6.184q0 .499-.496.499h-5.11c-.32 0-.488-.17-.488-.489zm.245.006v3.109c0 .189.039.228.227.228h5.142c.202 0 .236-.035.236-.239v-6.197c0-.197-.038-.234-.233-.234H7.941c-.205 0-.24.035-.24.243zm8.741-4.058q-.002 2.09.002 4.184c0 .11-.03.143-.14.142a96.883 97 0 0 0-1.752 0c-.104 0-.12-.04-.12-.13 0-.093.03-.12.12-.12.5.004 1 0 1.499.004.108 0 .148-.031.148-.145q-.003-3.934 0-7.868c0-.112-.036-.147-.147-.146-.5.005-.999 0-1.498.004-.1 0-.123-.034-.123-.128 0-.09.024-.122.119-.121q.888.005 1.776 0c.096 0 .117.033.117.122q-.002 2.101 0 4.202m-5.9-6.336q-1.024 0-2.047-.002c-.04 0-.109-.01-.113-.028-.012-.061-.004-.127 0-.191 0-.01.031-.02.052-.023q.04-.004.082-.002h4.046c.133 0 .194.088.137.208-.01.024-.066.036-.1.036q-.846.002-1.691.001zm.273 1.413c-.585 0-1.17-.004-1.758.003-.13 0-.118-.068-.123-.153-.007-.102.055-.097.123-.097h3.526c.068 0 .13-.004.123.097-.005.086.006.154-.123.153-.59-.008-1.178-.003-1.766-.003Zm.005 1.307c.59 0 1.178.002 1.767-.002.103 0 .118.041.12.13 0 .093-.03.12-.12.12a737.113 738 0 0 0-3.536 0c-.092 0-.121-.029-.12-.121 0-.09.02-.13.121-.13q.886.005 1.768.003m-.009 1.797c-.585 0-1.173-.002-1.759.002-.093 0-.12-.03-.12-.122 0-.093.023-.128.123-.126q1.764.006 3.528 0c.098 0 .123.03.123.125.002.1-.03.124-.127.123q-.884-.003-1.768-.002M8.564 8.664H8.53c-.16 0-.202-.034-.147-.187.045-.129.185-.035.28-.055.027-.004.087.033.092.06.03.172.017.181-.19.181Zm.003-1.799h.034c.166 0 .206.031.148.19-.047.13-.187.034-.284.052-.023.006-.08-.038-.084-.064-.024-.177-.02-.177.185-.177Zm.002 3.351h-.051q-.206.001-.138-.2c.006-.02.038-.04.06-.042.06-.006.118-.002.176-.002.133 0 .19.086.135.208-.006.018-.041.03-.066.034-.038.006-.078.002-.117.002Zm1.973 3.638q1.025.001 2.047-.002c.092 0 .12.027.12.12 0 .09-.017.13-.119.128a878.942 880 0 0 0-4.093 0c-.096 0-.126-.027-.126-.124s.03-.125.125-.125q1.025.004 2.046.003m.272 1.658c-.585 0-1.171-.004-1.758.003-.134 0-.113-.076-.119-.156-.007-.097.051-.094.12-.094h3.533c.075 0 .126.005.12.103-.007.081.006.15-.12.148-.592-.006-1.184-.002-1.776-.002Zm0 1.551q-.88-.002-1.758.002c-.1 0-.12-.037-.121-.129 0-.091.029-.12.12-.12q1.768.004 3.535 0c.09 0 .121.027.12.12 0 .089-.016.13-.12.128q-.887-.004-1.775-.002Zm.009 1.309q.883.002 1.767-.002c.096 0 .12.033.12.122-.002.086-.015.127-.116.126a742.107 743 0 0 0-3.545 0c-.092 0-.116-.033-.113-.118.001-.08.005-.131.11-.13q.889.004 1.778.002m-2.257-3.108h.025c.177 0 .2.013.157.185-.033.13-.161.042-.246.06-.043.008-.117.033-.127-.06-.02-.179-.016-.184.192-.184Zm-.003 1.554h.046c.14 0 .19.07.141.204-.006.019-.039.036-.062.038-.062.005-.124-.003-.187.003-.1.012-.132-.026-.133-.13-.003-.187.133-.087.195-.115m.002 1.798h-.051c-.135 0-.184-.067-.136-.202.006-.018.038-.038.062-.04.054-.006.11-.002.165-.002.145 0 .192.062.146.2-.006.02-.038.038-.06.042-.042.005-.085.001-.125.001Z' />
                </svg>
              </Link>

              <Link href='https://supabase.com' target='_blank'>
                <svg
                  role='img'
                  className='mx-6 inline h-14'
                  fill='#fff'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Supabase</title>
                  <path d='M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z' />
                </svg>
              </Link>

              <Link href='https://planetscale.com' target='_blank'>
                <svg
                  className='mx-6 inline h-14'
                  fill='#fff'
                  role='img'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>PlanetScale</title>
                  <path d='M0 12C0 5.373 5.373 0 12 0c4.873 0 9.067 2.904 10.947 7.077l-15.87 15.87a11.981 11.981 0 0 1-1.935-1.099L14.99 12H12l-8.485 8.485A11.962 11.962 0 0 1 0 12Zm12.004 12L24 12.004C23.998 18.628 18.628 23.998 12.004 24Z' />
                </svg>
              </Link>

              <Link href='https://www.typescriptlang.org' target='_blank'>
                <svg
                  className='mx-6 inline h-14'
                  fill='#fff'
                  role='img'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>TypeScript</title>
                  <path d='M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z' />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </Main>
  );
}
