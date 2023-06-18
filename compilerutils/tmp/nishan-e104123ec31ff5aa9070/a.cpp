#include<stdio.h>
int main()
{
    int n,arr[100],i,j,k=0,temp;
    while(scanf("%d",&n)!=EOF){
        for(i=0;i<n;i++){
         scanf("%d",&arr[i]);
        }
           for(i=0;i<n-1;i++){
                k++;
            for(j=0;j<n-1-i;j++){
                if(arr[j]>arr[j+1]){
                    temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
            }
        }
        printf("%d\n",k);
        k=0;
    }


    return 0;
}
